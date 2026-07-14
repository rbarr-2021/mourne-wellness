import { getAvailableSlots } from "../availability-engine"
import {
  addHours,
  BOOKING_DEPOSIT_STATUS,
  BOOKING_SOURCE,
  BOOKING_STATUS,
  createReservedPeriodFromBooking,
  isBookingSlotReserved,
  normalizeBookingRecord,
  normalizeBookingReservations,
  normalizeHealthInformation,
  SLOT_LOCK_HOURS,
  toTimeValue,
} from "../bookings"
import { normalizeTreatmentRecord, TREATMENT_STATUS } from "../treatments"
import {
  createBookingRecord,
  getBusinessSettings,
  getBookingById,
  listAvailabilityExceptions,
  listBookingReservations,
  listPublicTreatments,
  listTreatmentsForIds,
  updateBookingRecord,
} from "../supabase/database"

function createBookingError(code, message) {
  const error = new Error(message)
  error.code = code
  return error
}

function createBookingId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `booking-${Date.now()}`
}

function getReservedPeriods(bookings, excludeBookingId = null, now = new Date()) {
  return normalizeBookingReservations(bookings)
    .filter((booking) => booking.id !== excludeBookingId)
    .filter((booking) => isBookingSlotReserved(booking, now))
    .map(createReservedPeriodFromBooking)
}

async function loadBookingContext({ treatmentId, existingAvailabilityExceptions, existingReservations, businessSettings }) {
  const [settingsResponse, availabilityResponse, reservationsResponse] = await Promise.all([
    businessSettings ? Promise.resolve({ data: businessSettings }) : getBusinessSettings(),
    existingAvailabilityExceptions ? Promise.resolve({ data: existingAvailabilityExceptions }) : listAvailabilityExceptions(),
    existingReservations ? Promise.resolve({ data: existingReservations }) : listBookingReservations(),
  ])

  const treatmentResponse = treatmentId ? await listTreatmentsForIds([treatmentId]) : await listPublicTreatments()

  return {
    businessSettings: settingsResponse.data,
    availabilityExceptions: availabilityResponse.data ?? [],
    reservations: reservationsResponse.data ?? [],
    treatments: treatmentResponse.data ?? [],
  }
}

function resolveTreatmentAndOption(treatments, treatmentId, treatmentOptionId) {
  const treatment = treatments.find((entry) => entry.id === treatmentId)

  if (!treatment) {
    throw createBookingError("TREATMENT_NOT_FOUND", "This treatment is no longer available.")
  }

  const normalizedTreatment = normalizeTreatmentRecord(treatment)

  if (normalizedTreatment.status !== TREATMENT_STATUS.ACTIVE || !normalizedTreatment.booking_enabled) {
    throw createBookingError("TREATMENT_UNAVAILABLE", "This treatment is not currently open for booking.")
  }

  const treatmentOption = normalizedTreatment.options.find((option) => option.id === treatmentOptionId)

  if (!treatmentOption) {
    throw createBookingError("TREATMENT_OPTION_NOT_FOUND", "Please choose a valid treatment duration.")
  }

  return { treatment: normalizedTreatment, treatmentOption }
}

function ensureRequestableSlot({
  requestedDate,
  startTime,
  businessSettings,
  treatment,
  treatmentOption,
  availabilityExceptions,
  reservations,
  excludeBookingId = null,
  now = new Date(),
}) {
  const availableSlots = getAvailableSlots({
    date: requestedDate,
    businessSettings,
    treatment,
    treatmentOption,
    availabilityExceptions: [...availabilityExceptions, ...getReservedPeriods(reservations, excludeBookingId, now)],
    now,
  })

  const matchedSlot = availableSlots.find((slot) => toTimeValue(slot.start) === startTime)

  if (!matchedSlot) {
    throw createBookingError("SLOT_UNAVAILABLE", "This appointment time is no longer available. Please choose another time.")
  }

  return matchedSlot
}

function validateCustomerInput(payload) {
  if (!payload.clientName?.trim()) {
    throw createBookingError("CLIENT_NAME_REQUIRED", "Please enter your full name.")
  }

  if (!payload.clientEmail?.trim()) {
    throw createBookingError("CLIENT_EMAIL_REQUIRED", "Please enter your email address.")
  }

  if (!payload.clientPhone?.trim()) {
    throw createBookingError("CLIENT_PHONE_REQUIRED", "Please enter your mobile number.")
  }
}

function validateDuplicateRequest(reservations, payload) {
  const duplicate = reservations.find(
    (booking) =>
      isBookingSlotReserved(booking) &&
      booking.treatment_option_id === payload.treatmentOptionId &&
      booking.requested_date === payload.requestedDate &&
      String(booking.start_time).slice(0, 5) === payload.startTime &&
      booking.client_email?.trim().toLowerCase() === payload.clientEmail.trim().toLowerCase()
  )

  if (duplicate) {
    throw createBookingError("DUPLICATE_REQUEST", "A booking request for this appointment time already exists.")
  }
}

export async function getRequestableSlots({
  requestedDate,
  treatmentId,
  treatmentOptionId,
  businessSettings,
  availabilityExceptions,
  reservations,
  now = new Date(),
  excludeBookingId = null,
}) {
  const context = await loadBookingContext({
    treatmentId,
    existingAvailabilityExceptions: availabilityExceptions,
    existingReservations: reservations,
    businessSettings,
  })
  const { treatment, treatmentOption } = resolveTreatmentAndOption(context.treatments, treatmentId, treatmentOptionId)

  return getAvailableSlots({
    date: requestedDate,
    businessSettings: context.businessSettings,
    treatment,
    treatmentOption,
    availabilityExceptions: [...context.availabilityExceptions, ...getReservedPeriods(context.reservations, excludeBookingId, now)],
    now,
  })
}

export async function createBookingRequest({
  treatmentId,
  treatmentOptionId,
  requestedDate,
  startTime,
  clientName,
  clientEmail,
  clientPhone,
  whatsappNotifications = false,
  healthInformation,
  additionalNotes = "",
  source = BOOKING_SOURCE.WEBSITE,
  businessSettings,
  availabilityExceptions,
  reservations,
  now = new Date(),
}) {
  validateCustomerInput({ clientName, clientEmail, clientPhone })

  const context = await loadBookingContext({
    treatmentId,
    existingAvailabilityExceptions: availabilityExceptions,
    existingReservations: reservations,
    businessSettings,
  })
  const { treatment, treatmentOption } = resolveTreatmentAndOption(context.treatments, treatmentId, treatmentOptionId)
  validateDuplicateRequest(context.reservations, {
    treatmentOptionId,
    requestedDate,
    startTime,
    clientEmail,
  })

  const matchedSlot = ensureRequestableSlot({
    requestedDate,
    startTime,
    businessSettings: context.businessSettings,
    treatment,
    treatmentOption,
    availabilityExceptions: context.availabilityExceptions,
    reservations: context.reservations,
    now,
  })

  const payload = {
    id: createBookingId(),
    client_name: clientName.trim(),
    client_email: clientEmail.trim(),
    client_phone: clientPhone.trim(),
    whatsapp_notifications: Boolean(whatsappNotifications),
    treatment_id: treatment.id,
    treatment_option_id: treatmentOption.id,
    requested_date: requestedDate,
    start_time: startTime,
    end_time: toTimeValue(matchedSlot.end),
    status: BOOKING_STATUS.PENDING_REVIEW,
    deposit_status: BOOKING_DEPOSIT_STATUS.PENDING,
    source,
    health_information: normalizeHealthInformation(healthInformation),
    additional_notes: additionalNotes.trim() || null,
    slot_locked_until: source === BOOKING_SOURCE.WEBSITE ? addHours(new Date(now), SLOT_LOCK_HOURS).toISOString() : null,
  }

  const response = await createBookingRecord(payload)

  if (response.error || !response.data) {
    throw createBookingError("BOOKING_CREATE_FAILED", "We couldn't save your booking request just now. Please try again.")
  }

  return normalizeBookingRecord({
    ...response.data,
    treatment,
    treatment_option: treatmentOption,
  })
}

export async function updateBookingStatus({ bookingId, nextStatus, updates = {} }) {
  const bookingResponse = await getBookingById(bookingId)

  if (bookingResponse.error || !bookingResponse.data) {
    throw createBookingError("BOOKING_NOT_FOUND", "This booking request could not be found.")
  }

  const response = await updateBookingRecord(bookingId, {
    ...updates,
    status: nextStatus,
  })

  if (response.error || !response.data) {
    throw createBookingError("BOOKING_UPDATE_FAILED", "We couldn't update this booking request just now.")
  }

  return normalizeBookingRecord(response.data)
}

export async function approveBooking({ bookingId, businessSettings, availabilityExceptions, reservations, now = new Date() }) {
  const bookingResponse = await getBookingById(bookingId)

  if (bookingResponse.error || !bookingResponse.data) {
    throw createBookingError("BOOKING_NOT_FOUND", "This booking request could not be found.")
  }

  const booking = bookingResponse.data
  const context = await loadBookingContext({
    treatmentId: booking.treatment_id,
    existingAvailabilityExceptions: availabilityExceptions,
    existingReservations: reservations,
    businessSettings,
  })
  const { treatment, treatmentOption } = resolveTreatmentAndOption(context.treatments, booking.treatment_id, booking.treatment_option_id)

  ensureRequestableSlot({
    requestedDate: booking.requested_date,
    startTime: String(booking.start_time).slice(0, 5),
    businessSettings: context.businessSettings,
    treatment,
    treatmentOption,
    availabilityExceptions: context.availabilityExceptions,
    reservations: context.reservations,
    excludeBookingId: booking.id,
    now,
  })

  return updateBookingStatus({
    bookingId,
    nextStatus: BOOKING_STATUS.READY_FOR_DEPOSIT,
    updates: {
      slot_locked_until: null,
      deposit_status: BOOKING_DEPOSIT_STATUS.PENDING,
    },
  })
}

export async function declineBooking({ bookingId }) {
  return updateBookingStatus({
    bookingId,
    nextStatus: BOOKING_STATUS.DECLINED,
    updates: {
      slot_locked_until: null,
    },
  })
}

export async function cancelBooking({ bookingId }) {
  return updateBookingStatus({
    bookingId,
    nextStatus: BOOKING_STATUS.CANCELLED,
    updates: {
      slot_locked_until: null,
    },
  })
}

export async function completeBooking({ bookingId }) {
  return updateBookingStatus({
    bookingId,
    nextStatus: BOOKING_STATUS.COMPLETED,
  })
}

export async function suggestAlternative({ bookingId, proposedDate, proposedStartTime, businessSettings, availabilityExceptions, reservations, now = new Date() }) {
  const bookingResponse = await getBookingById(bookingId)

  if (bookingResponse.error || !bookingResponse.data) {
    throw createBookingError("BOOKING_NOT_FOUND", "This booking request could not be found.")
  }

  const booking = bookingResponse.data
  const context = await loadBookingContext({
    treatmentId: booking.treatment_id,
    existingAvailabilityExceptions: availabilityExceptions,
    existingReservations: reservations,
    businessSettings,
  })
  const { treatment, treatmentOption } = resolveTreatmentAndOption(context.treatments, booking.treatment_id, booking.treatment_option_id)
  const matchedSlot = ensureRequestableSlot({
    requestedDate: proposedDate,
    startTime: proposedStartTime,
    businessSettings: context.businessSettings,
    treatment,
    treatmentOption,
    availabilityExceptions: context.availabilityExceptions,
    reservations: context.reservations,
    excludeBookingId: booking.id,
    now,
  })

  return updateBookingStatus({
    bookingId,
    nextStatus: BOOKING_STATUS.PENDING_REVIEW,
    updates: {
      proposed_start_time: matchedSlot.start.toISOString(),
      proposed_end_time: matchedSlot.end.toISOString(),
    },
  })
}

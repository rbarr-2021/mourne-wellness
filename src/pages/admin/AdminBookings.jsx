import { useEffect, useMemo, useState } from "react"
import Seo from "../../components/Seo"
import { approveBooking, createBookingRequest, declineBooking, getRequestableSlots, suggestAlternative } from "../../lib/booking-service"
import {
  BOOKING_SOURCE,
  BOOKING_STATUS,
  buildBookingCalendarEvent,
  formatBookingDate,
  formatBookingTime,
  getBookingStatusMeta,
} from "../../lib/bookings"
import { formatAvailabilityException, getMonthGrid, getEventsForDate, toDateInputValue } from "../../lib/availability"
import {
  getBusinessSettings,
  listAdminTreatments,
  listAvailabilityExceptions,
  listBookingReservations,
  listBookings,
} from "../../lib/supabase/database"

function getEmptyManualBooking() {
  return {
    treatmentId: "",
    treatmentOptionId: "",
    requestedDate: toDateInputValue(new Date()),
    startTime: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    pregnant: "no",
    injuries: "",
    medicalConditions: "",
    anythingElse: "",
    additionalNotes: "",
  }
}

function BookingStatusPill({ status }) {
  const meta = getBookingStatusMeta(status)

  return <span className={`admin-booking-status-pill admin-booking-status-pill--${meta.colorClass}`}>{meta.label}</span>
}

function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [businessSettings, setBusinessSettings] = useState(null)
  const [availabilityExceptions, setAvailabilityExceptions] = useState([])
  const [reservations, setReservations] = useState([])
  const [treatments, setTreatments] = useState([])
  const [selectedBookingId, setSelectedBookingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [alternativeDate, setAlternativeDate] = useState("")
  const [alternativeSlots, setAlternativeSlots] = useState([])
  const [manualBooking, setManualBooking] = useState(getEmptyManualBooking())
  const [manualSlots, setManualSlots] = useState([])
  const [isCreatingManualBooking, setIsCreatingManualBooking] = useState(false)

  const loadData = async ({ preserveSelection = true } = {}) => {
    const [
      { data: bookingsData },
      { data: settingsData },
      { data: availabilityData },
      { data: reservationsData },
      { data: treatmentsData },
    ] = await Promise.all([
      listBookings(),
      getBusinessSettings(),
      listAvailabilityExceptions(),
      listBookingReservations(),
      listAdminTreatments(),
    ])

    setBookings(bookingsData ?? [])
    setBusinessSettings(settingsData ?? null)
    setAvailabilityExceptions(availabilityData ?? [])
    setReservations(reservationsData ?? [])
    setTreatments(treatmentsData ?? [])

    if ((bookingsData ?? []).length > 0) {
      setSelectedBookingId((current) => {
        if (!preserveSelection || !current || !(bookingsData ?? []).some((booking) => booking.id === current)) {
          return bookingsData[0].id
        }

        return current
      })
    }

    if ((treatmentsData ?? []).length > 0) {
      const firstTreatment = treatmentsData[0]
      setManualBooking((current) => ({
        ...current,
        treatmentId: current.treatmentId || firstTreatment.id,
        treatmentOptionId: current.treatmentOptionId || firstTreatment.options?.[0]?.id || "",
      }))
    }
  }

  useEffect(() => {
    let isMounted = true

    const initialize = async () => {
      const [
        { data: bookingsData },
        { data: settingsData },
        { data: availabilityData },
        { data: reservationsData },
        { data: treatmentsData },
      ] = await Promise.all([
        listBookings(),
        getBusinessSettings(),
        listAvailabilityExceptions(),
        listBookingReservations(),
        listAdminTreatments(),
      ])

      if (!isMounted) {
        return
      }

      setBookings(bookingsData ?? [])
      setBusinessSettings(settingsData ?? null)
      setAvailabilityExceptions(availabilityData ?? [])
      setReservations(reservationsData ?? [])
      setTreatments(treatmentsData ?? [])

      if ((bookingsData ?? []).length > 0) {
        setSelectedBookingId(bookingsData[0].id)
      }

      if ((treatmentsData ?? []).length > 0) {
        const firstTreatment = treatmentsData[0]
        setManualBooking((current) => ({
          ...current,
          treatmentId: current.treatmentId || firstTreatment.id,
          treatmentOptionId: current.treatmentOptionId || firstTreatment.options?.[0]?.id || "",
        }))
      }

      setIsLoading(false)
    }

    initialize()

    return () => {
      isMounted = false
    }
  }, [])

  const selectedBooking = useMemo(
    () => bookings.find((booking) => booking.id === selectedBookingId) ?? null,
    [bookings, selectedBookingId]
  )

  const pendingCount = bookings.filter((booking) => booking.status === BOOKING_STATUS.PENDING_REVIEW).length
  const readyCount = bookings.filter((booking) => booking.status === BOOKING_STATUS.READY_FOR_DEPOSIT).length

  const activeBookingEvents = useMemo(
    () =>
      bookings
        .filter((booking) => [BOOKING_STATUS.PENDING_REVIEW, BOOKING_STATUS.READY_FOR_DEPOSIT, BOOKING_STATUS.CONFIRMED].includes(booking.status))
        .map(buildBookingCalendarEvent),
    [bookings]
  )

  const visibleCalendarDays = useMemo(() => getMonthGrid(calendarDate), [calendarDate])

  useEffect(() => {
    const loadAlternativeSlots = async () => {
      if (!selectedBooking || !alternativeDate || !businessSettings) {
        setAlternativeSlots([])
        return
      }

      const slots = await getRequestableSlots({
        requestedDate: alternativeDate,
        treatmentId: selectedBooking.treatment_id,
        treatmentOptionId: selectedBooking.treatment_option_id,
        businessSettings,
        availabilityExceptions,
        reservations,
        excludeBookingId: selectedBooking.id,
      })

      setAlternativeSlots(slots)
    }

    loadAlternativeSlots()
  }, [alternativeDate, availabilityExceptions, businessSettings, reservations, selectedBooking])

  useEffect(() => {
    const loadManualSlots = async () => {
      if (!manualBooking.treatmentId || !manualBooking.treatmentOptionId || !manualBooking.requestedDate || !businessSettings) {
        setManualSlots([])
        return
      }

      const slots = await getRequestableSlots({
        requestedDate: manualBooking.requestedDate,
        treatmentId: manualBooking.treatmentId,
        treatmentOptionId: manualBooking.treatmentOptionId,
        businessSettings,
        availabilityExceptions,
        reservations,
      })

      setManualSlots(slots)
    }

    loadManualSlots()
  }, [availabilityExceptions, businessSettings, manualBooking.requestedDate, manualBooking.treatmentId, manualBooking.treatmentOptionId, reservations])

  const changeManualField = (field, value) => {
    setManualBooking((current) => {
      if (field === "treatmentId") {
        const nextTreatment = treatments.find((entry) => entry.id === value)

        return {
          ...current,
          treatmentId: value,
          treatmentOptionId: nextTreatment?.options?.[0]?.id ?? "",
          startTime: "",
        }
      }

      return {
        ...current,
        [field]: value,
      }
    })
  }

  const handleApprove = async () => {
    if (!selectedBooking) return

    setIsSaving(true)
    setFeedback("")

    try {
      await approveBooking({
        bookingId: selectedBooking.id,
        businessSettings,
        availabilityExceptions,
        reservations,
      })
      setFeedback("Booking approved.")
      await loadData()
    } catch (error) {
      setFeedback(error.message || "We couldn't approve this booking request just now.")
    }

    setIsSaving(false)
  }

  const handleDecline = async () => {
    if (!selectedBooking) return

    setIsSaving(true)
    setFeedback("")

    try {
      await declineBooking({ bookingId: selectedBooking.id })
      setFeedback("Booking declined.")
      await loadData()
    } catch (error) {
      setFeedback(error.message || "We couldn't decline this booking request just now.")
    }

    setIsSaving(false)
  }

  const handleSuggestAlternative = async (slot) => {
    if (!selectedBooking) return

    setIsSaving(true)
    setFeedback("")

    try {
      await suggestAlternative({
        bookingId: selectedBooking.id,
        proposedDate: alternativeDate,
        proposedStartTime: slot.label,
        businessSettings,
        availabilityExceptions,
        reservations,
      })
      setFeedback("Alternative appointment suggested.")
      await loadData()
    } catch (error) {
      setFeedback(error.message || "We couldn't save this alternative time just now.")
    }

    setIsSaving(false)
  }

  const handleManualCreate = async () => {
    setIsSaving(true)
    setFeedback("")

    try {
      await createBookingRequest({
        treatmentId: manualBooking.treatmentId,
        treatmentOptionId: manualBooking.treatmentOptionId,
        requestedDate: manualBooking.requestedDate,
        startTime: manualBooking.startTime,
        clientName: manualBooking.clientName,
        clientEmail: manualBooking.clientEmail,
        clientPhone: manualBooking.clientPhone,
        healthInformation: {
          pregnant: manualBooking.pregnant,
          injuries: manualBooking.injuries,
          medicalConditions: manualBooking.medicalConditions,
          anythingElse: manualBooking.anythingElse,
        },
        additionalNotes: manualBooking.additionalNotes,
        source: BOOKING_SOURCE.ADMINISTRATOR,
        businessSettings,
        availabilityExceptions,
        reservations,
      })

      setFeedback("Booking request saved.")
      setManualBooking(getEmptyManualBooking())
      setIsCreatingManualBooking(false)
      await loadData()
    } catch (error) {
      setFeedback(error.message || "We couldn't save this booking request just now.")
    }

    setIsSaving(false)
  }

  const selectedManualTreatment = treatments.find((treatment) => treatment.id === manualBooking.treatmentId) ?? null

  return (
    <>
      <Seo title="Admin Bookings | Retreat by the Mournes" description="Administrator bookings area." path="/admin/bookings" robots="noindex, nofollow" />
      <div className="admin-panel">
        <div className="admin-panel__header admin-panel__header--stacked">
          <div>
            <h2 className="admin-panel__title">Booking Requests</h2>
            <p className="section-copy admin-panel__copy">
              Review new requests, approve the ones you want to accept, or suggest a better appointment time.
            </p>
          </div>

          <div className="admin-inline-links">
            <button type="button" className="ghost-button" onClick={() => setIsCreatingManualBooking((current) => !current)}>
              {isCreatingManualBooking ? "Close Manual Booking" : "New Booking Request"}
            </button>
          </div>
        </div>

        {feedback ? <p className={feedback.includes("couldn't") ? "admin-auth-error" : "admin-auth-success"}>{feedback}</p> : null}

        {isLoading ? (
          <p className="section-copy admin-panel__copy">Loading booking requests...</p>
        ) : (
          <>
            <section className="admin-dashboard-summary">
              <article className="admin-summary-card">
                <p className="admin-summary-card__label">Pending Review</p>
                <h3 className="admin-summary-card__value">{pendingCount}</h3>
                <p className="section-copy admin-summary-card__copy">Requests waiting for your review.</p>
              </article>
              <article className="admin-summary-card">
                <p className="admin-summary-card__label">Ready for Deposit</p>
                <h3 className="admin-summary-card__value">{readyCount}</h3>
                <p className="section-copy admin-summary-card__copy">Approved requests ready for the next payment phase.</p>
              </article>
              <article className="admin-summary-card">
                <p className="admin-summary-card__label">Total Requests</p>
                <h3 className="admin-summary-card__value">{bookings.length}</h3>
                <p className="section-copy admin-summary-card__copy">Every booking request stored in Supabase.</p>
              </article>
            </section>

            {isCreatingManualBooking ? (
              <section className="admin-subpanel admin-subpanel--full">
                <div className="admin-subpanel__header">
                  <div>
                    <h3 className="admin-subpanel__title">Manual Booking Request</h3>
                    <p className="section-copy admin-subpanel__copy">
                      Create a booking request on behalf of a client using the same workflow as the website.
                    </p>
                  </div>
                </div>

                <div className="admin-form-grid admin-form-grid--two-column">
                  <label className="admin-field">
                    <span className="admin-field__label">Treatment</span>
                    <select className="admin-input" value={manualBooking.treatmentId} onChange={(event) => changeManualField("treatmentId", event.target.value)}>
                      {treatments.map((treatment) => (
                        <option key={treatment.id} value={treatment.id}>
                          {treatment.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Duration</span>
                    <select className="admin-input" value={manualBooking.treatmentOptionId} onChange={(event) => changeManualField("treatmentOptionId", event.target.value)}>
                      {(selectedManualTreatment?.options ?? []).map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Preferred date</span>
                    <input className="admin-input" type="date" value={manualBooking.requestedDate} onChange={(event) => changeManualField("requestedDate", event.target.value)} />
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Available time</span>
                    <select className="admin-input" value={manualBooking.startTime} onChange={(event) => changeManualField("startTime", event.target.value)}>
                      <option value="">Choose a time</option>
                      {manualSlots.map((slot) => (
                        <option key={slot.start.toISOString()} value={slot.label}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Full name</span>
                    <input className="admin-input" value={manualBooking.clientName} onChange={(event) => changeManualField("clientName", event.target.value)} />
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Email address</span>
                    <input className="admin-input" type="email" value={manualBooking.clientEmail} onChange={(event) => changeManualField("clientEmail", event.target.value)} />
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Mobile number</span>
                    <input className="admin-input" value={manualBooking.clientPhone} onChange={(event) => changeManualField("clientPhone", event.target.value)} />
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Are they pregnant?</span>
                    <select className="admin-input" value={manualBooking.pregnant} onChange={(event) => changeManualField("pregnant", event.target.value)}>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </label>

                  <label className="admin-field admin-field--full">
                    <span className="admin-field__label">Injuries</span>
                    <textarea className="admin-input admin-textarea" value={manualBooking.injuries} onChange={(event) => changeManualField("injuries", event.target.value)} />
                  </label>

                  <label className="admin-field admin-field--full">
                    <span className="admin-field__label">Medical conditions</span>
                    <textarea className="admin-input admin-textarea" value={manualBooking.medicalConditions} onChange={(event) => changeManualField("medicalConditions", event.target.value)} />
                  </label>

                  <label className="admin-field admin-field--full">
                    <span className="admin-field__label">Anything else Beata should know?</span>
                    <textarea className="admin-input admin-textarea" value={manualBooking.anythingElse} onChange={(event) => changeManualField("anythingElse", event.target.value)} />
                  </label>

                  <label className="admin-field admin-field--full">
                    <span className="admin-field__label">Additional notes</span>
                    <textarea className="admin-input admin-textarea" value={manualBooking.additionalNotes} onChange={(event) => changeManualField("additionalNotes", event.target.value)} />
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button type="button" className="cta-button" onClick={handleManualCreate} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Booking Request"}
                  </button>
                </div>
              </section>
            ) : null}

            <div className="admin-bookings-layout">
              <section className="admin-subpanel">
                <div className="admin-subpanel__header">
                  <div>
                    <h3 className="admin-subpanel__title">Booking Queue</h3>
                    <p className="section-copy admin-subpanel__copy">
                      Newest requests appear first. Tap one to review it properly.
                    </p>
                  </div>
                </div>

                {bookings.length === 0 ? (
                  <p className="section-copy admin-subpanel__copy">
                    No booking requests yet. When customers send booking requests they will appear here.
                  </p>
                ) : (
                  <div className="admin-booking-queue">
                    {bookings.map((booking) => (
                      <button
                        key={booking.id}
                        type="button"
                        className={`admin-booking-card ${selectedBookingId === booking.id ? "is-active" : ""}`}
                        onClick={() => setSelectedBookingId(booking.id)}
                      >
                        <div className="admin-booking-card__header">
                          <strong>{booking.treatment?.name ?? "Booking request"}</strong>
                          <BookingStatusPill status={booking.status} />
                        </div>
                        <div className="admin-booking-card__meta">
                          <span>{formatBookingDate(booking.requested_date)}</span>
                          <span>{formatBookingTime(booking.start_time)}</span>
                          <span>{booking.client_name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section className="admin-subpanel admin-subpanel--stretch">
                <div className="admin-subpanel__header">
                  <div>
                    <h3 className="admin-subpanel__title">Review Request</h3>
                    <p className="section-copy admin-subpanel__copy">
                      Focus on what needs to happen next: approve, suggest another time, or decline.
                    </p>
                  </div>
                </div>

                {!selectedBooking ? (
                  <p className="section-copy admin-subpanel__copy">Select a booking request to review it.</p>
                ) : (
                  <div className="admin-booking-detail">
                    <div className="admin-dashboard-grid">
                      <article className="admin-compact-list__item">
                        <strong>Customer</strong>
                        <span>{selectedBooking.client_name}</span>
                        <span>{selectedBooking.client_email}</span>
                        <span>{selectedBooking.client_phone}</span>
                      </article>

                      <article className="admin-compact-list__item">
                        <strong>Treatment</strong>
                        <span>{selectedBooking.treatment?.name}</span>
                        <span>{selectedBooking.treatment_option?.label}</span>
                        <span>Source: {selectedBooking.source === BOOKING_SOURCE.ADMINISTRATOR ? "Administrator" : "Website"}</span>
                      </article>

                      <article className="admin-compact-list__item">
                        <strong>Appointment</strong>
                        <span>{formatBookingDate(selectedBooking.requested_date)}</span>
                        <span>
                          {formatBookingTime(selectedBooking.start_time)} - {formatBookingTime(selectedBooking.end_time)}
                        </span>
                        {selectedBooking.proposed_start_time ? (
                          <span>
                            Suggested: {new Date(selectedBooking.proposed_start_time).toLocaleDateString("en-GB")}{" "}
                            {new Date(selectedBooking.proposed_start_time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        ) : null}
                      </article>

                      <article className="admin-compact-list__item">
                        <strong>Health Information</strong>
                        <span>Pregnant: {selectedBooking.health_information.pregnant}</span>
                        <span>Injuries: {selectedBooking.health_information.injuries || "None provided"}</span>
                        <span>Medical conditions: {selectedBooking.health_information.medicalConditions || "None provided"}</span>
                        <span>Anything else: {selectedBooking.health_information.anythingElse || "None provided"}</span>
                      </article>
                    </div>

                    {selectedBooking.additional_notes ? (
                      <article className="admin-compact-list__item">
                        <strong>Additional Notes</strong>
                        <span>{selectedBooking.additional_notes}</span>
                      </article>
                    ) : null}

                    <div className="admin-form-actions">
                      <button type="button" className="cta-button" onClick={handleApprove} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Approve Request"}
                      </button>
                      <button type="button" className="ghost-button" onClick={handleDecline} disabled={isSaving}>
                        Decline Request
                      </button>
                    </div>

                    <div className="admin-subpanel admin-subpanel--nested">
                      <div className="admin-subpanel__header">
                        <div>
                          <h4 className="admin-subpanel__title">Suggest Another Time</h4>
                          <p className="section-copy admin-subpanel__copy">
                            Choose another available appointment time if the original slot no longer suits.
                          </p>
                        </div>
                      </div>

                      <div className="admin-form-grid admin-form-grid--two-column">
                        <label className="admin-field">
                          <span className="admin-field__label">Alternative date</span>
                          <input className="admin-input" type="date" value={alternativeDate} onChange={(event) => setAlternativeDate(event.target.value)} />
                        </label>
                      </div>

                      {alternativeSlots.length > 0 ? (
                        <div className="admin-slot-list">
                          {alternativeSlots.map((slot) => (
                            <button key={slot.start.toISOString()} type="button" className="admin-slot-pill" onClick={() => handleSuggestAlternative(slot)}>
                              {slot.label}
                            </button>
                          ))}
                        </div>
                      ) : alternativeDate ? (
                        <p className="section-copy admin-subpanel__copy">No alternative times are available for that date.</p>
                      ) : null}
                    </div>
                  </div>
                )}
              </section>
            </div>

            <section className="admin-subpanel admin-subpanel--full">
              <div className="admin-subpanel__header">
                <div>
                  <h3 className="admin-subpanel__title">Booking Calendar</h3>
                  <p className="section-copy admin-subpanel__copy">
                    Yellow shows requests waiting for review, amber shows requests ready for deposit, and red shows blocked availability.
                  </p>
                </div>
              </div>

              <div className="admin-calendar-toolbar">
                <div className="admin-action-row">
                  <button type="button" className="ghost-button" onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}>
                    Previous
                  </button>
                  <button type="button" className="ghost-button" onClick={() => setCalendarDate(new Date())}>
                    Today
                  </button>
                  <button type="button" className="ghost-button" onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}>
                    Next
                  </button>
                </div>

                <h4 className="admin-calendar-heading">
                  {calendarDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </h4>
              </div>

              <div className="admin-calendar-grid admin-calendar-grid--month">
                {visibleCalendarDays.map((day) => {
                  const bookingEvents = getEventsForDate(activeBookingEvents, day)
                  const availabilityEvents = getEventsForDate(availabilityExceptions.map(formatAvailabilityException), day)
                  const combinedEvents = [...bookingEvents, ...availabilityEvents].slice(0, 4)
                  const isCurrentMonth = day.getMonth() === calendarDate.getMonth()

                  return (
                    <div key={day.toISOString()} className={`admin-calendar-cell ${isCurrentMonth ? "" : "is-muted"}`}>
                      <div className="admin-calendar-cell__header">
                        <span>{day.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</span>
                        <span className="admin-calendar-cell__count">{combinedEvents.length}</span>
                      </div>

                      <div className="admin-calendar-events">
                        {combinedEvents.length === 0 ? <span className="admin-calendar-empty">No items</span> : null}
                        {combinedEvents.map((event) => (
                          <div key={`${event.id}-${event.start_datetime}`} className={`admin-calendar-event admin-calendar-event--${event.colorClass}`}>
                            <strong>{event.label}</strong>
                            <span>{event.timeLabel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  )
}

export default AdminBookings

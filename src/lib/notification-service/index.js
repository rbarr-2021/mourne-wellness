import { buildAdminNotificationTemplate, buildCustomerNotificationTemplate } from "./templates"

export const CUSTOMER_NOTIFICATION_TYPES = {
  BOOKING_RECEIVED: "BOOKING_RECEIVED",
  DEPOSIT_REQUESTED: "DEPOSIT_REQUESTED",
  BOOKING_CONFIRMED: "BOOKING_CONFIRMED",
  APPOINTMENT_REMINDER: "APPOINTMENT_REMINDER",
  BOOKING_CANCELLED: "BOOKING_CANCELLED",
}

export const ADMIN_NOTIFICATION_TYPES = {
  NEW_BOOKING_REQUEST: "ADMIN_NEW_BOOKING_REQUEST",
  DEPOSIT_PAID: "ADMIN_DEPOSIT_PAID",
  BOOKING_CANCELLED: "ADMIN_BOOKING_CANCELLED",
}

function buildChannels({ booking, includeWhatsApp = false }) {
  const channels = [
    {
      channel: "email",
      enabled: true,
      recipient: booking?.client_email ?? null,
      status: "provider_not_connected",
    },
  ]

  if (includeWhatsApp) {
    channels.push({
      channel: "whatsapp",
      enabled: Boolean(booking?.whatsapp_notifications),
      recipient: booking?.client_phone ?? null,
      status: booking?.whatsapp_notifications ? "provider_not_connected" : "not_selected",
    })
  }

  return channels
}

function createNotificationDraft({ type, booking, audience, channels, template }) {
  return {
    sent: false,
    provider: null,
    audience,
    type,
    bookingId: booking?.id ?? null,
    channels,
    template,
  }
}

export async function sendBookingReceived(booking) {
  return createNotificationDraft({
    type: CUSTOMER_NOTIFICATION_TYPES.BOOKING_RECEIVED,
    booking,
    audience: "customer",
    channels: buildChannels({ booking, includeWhatsApp: true }),
    template: buildCustomerNotificationTemplate(CUSTOMER_NOTIFICATION_TYPES.BOOKING_RECEIVED, booking),
  })
}

export async function sendDepositRequest(booking) {
  return createNotificationDraft({
    type: CUSTOMER_NOTIFICATION_TYPES.DEPOSIT_REQUESTED,
    booking,
    audience: "customer",
    channels: buildChannels({ booking, includeWhatsApp: true }),
    template: buildCustomerNotificationTemplate(CUSTOMER_NOTIFICATION_TYPES.DEPOSIT_REQUESTED, booking),
  })
}

export async function sendBookingConfirmed(booking) {
  return createNotificationDraft({
    type: CUSTOMER_NOTIFICATION_TYPES.BOOKING_CONFIRMED,
    booking,
    audience: "customer",
    channels: buildChannels({ booking, includeWhatsApp: true }),
    template: buildCustomerNotificationTemplate(CUSTOMER_NOTIFICATION_TYPES.BOOKING_CONFIRMED, booking),
  })
}

export async function sendReminder(booking) {
  return createNotificationDraft({
    type: CUSTOMER_NOTIFICATION_TYPES.APPOINTMENT_REMINDER,
    booking,
    audience: "customer",
    channels: buildChannels({ booking, includeWhatsApp: true }),
    template: buildCustomerNotificationTemplate(CUSTOMER_NOTIFICATION_TYPES.APPOINTMENT_REMINDER, booking),
  })
}

export async function sendBookingCancelled(booking) {
  return createNotificationDraft({
    type: CUSTOMER_NOTIFICATION_TYPES.BOOKING_CANCELLED,
    booking,
    audience: "customer",
    channels: buildChannels({ booking, includeWhatsApp: true }),
    template: buildCustomerNotificationTemplate(CUSTOMER_NOTIFICATION_TYPES.BOOKING_CANCELLED, booking),
  })
}

export async function notifyAdminNewBookingRequest(booking) {
  return createNotificationDraft({
    type: ADMIN_NOTIFICATION_TYPES.NEW_BOOKING_REQUEST,
    booking,
    audience: "administrator",
    channels: [
      {
        channel: "email",
        enabled: true,
        recipient: null,
        status: "provider_not_connected",
      },
    ],
    template: buildAdminNotificationTemplate(ADMIN_NOTIFICATION_TYPES.NEW_BOOKING_REQUEST, booking),
  })
}

export async function notifyAdminDepositPaid(booking) {
  return createNotificationDraft({
    type: ADMIN_NOTIFICATION_TYPES.DEPOSIT_PAID,
    booking,
    audience: "administrator",
    channels: [
      {
        channel: "email",
        enabled: true,
        recipient: null,
        status: "provider_not_connected",
      },
    ],
    template: buildAdminNotificationTemplate(ADMIN_NOTIFICATION_TYPES.DEPOSIT_PAID, booking),
  })
}

export async function notifyAdminBookingCancelled(booking) {
  return createNotificationDraft({
    type: ADMIN_NOTIFICATION_TYPES.BOOKING_CANCELLED,
    booking,
    audience: "administrator",
    channels: [
      {
        channel: "email",
        enabled: true,
        recipient: null,
        status: "provider_not_connected",
      },
    ],
    template: buildAdminNotificationTemplate(ADMIN_NOTIFICATION_TYPES.BOOKING_CANCELLED, booking),
  })
}

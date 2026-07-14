import "../styles/global.css"
import "../styles/treatments.css"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import Seo from "../components/Seo"
import { createBookingRequest, getRequestableSlots } from "../lib/booking-service"
import { BOOKING_SOURCE, formatBookingDate } from "../lib/bookings"
import { getBusinessSettings, listBookingReservations, listPublicAvailabilityPeriods, listPublicTreatments } from "../lib/supabase/database"
import {
  buildTreatmentsStructuredData,
  FACIAL_TREATMENT_NAME,
  FEATURED_INTRODUCTION,
  FEATURED_TREATMENT_NAME,
  LEGACY_TREATMENTS,
  mapTreatmentToPublicTreatment,
} from "../lib/treatments"

const fallbackTreatments = LEGACY_TREATMENTS.map(mapTreatmentToPublicTreatment)
const BOOKING_STEPS = ["Duration", "Date", "Time", "Details", "Health", "Review"]

function getEmptyBookingForm() {
  return {
    requestedDate: "",
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

function getStepIndex(step) {
  return BOOKING_STEPS.indexOf(step)
}

function Treatments() {
  const location = useLocation()
  const targetCategory = location.state?.targetCategory ?? null
  const [treatments, setTreatments] = useState(fallbackTreatments)
  const [businessSettings, setBusinessSettings] = useState(null)
  const [availabilityPeriods, setAvailabilityPeriods] = useState([])
  const [reservations, setReservations] = useState([])
  const [manualSelection, setManualSelection] = useState(null)
  const [bookingForm, setBookingForm] = useState(getEmptyBookingForm())
  const [bookingStep, setBookingStep] = useState("Duration")
  const [availableSlots, setAvailableSlots] = useState([])
  const [availabilityMessage, setAvailabilityMessage] = useState("")
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [successBooking, setSuccessBooking] = useState(null)
  const [isMobileWizardOpen, setIsMobileWizardOpen] = useState(false)

  useEffect(() => {
    const loadTreatments = async () => {
      const [{ data: treatmentData }, { data: settingsData }, { data: periodsData }, { data: reservationsData }] = await Promise.all([
        listPublicTreatments(),
        getBusinessSettings(),
        listPublicAvailabilityPeriods(),
        listBookingReservations(),
      ])

      if (treatmentData?.length) {
        setTreatments(treatmentData.map(mapTreatmentToPublicTreatment))
      }

      setBusinessSettings(settingsData ?? null)
      setAvailabilityPeriods(periodsData ?? [])
      setReservations(reservationsData ?? [])
    }

    loadTreatments()
  }, [])

  const structuredData = useMemo(
    () => buildTreatmentsStructuredData(treatments.length ? treatments : fallbackTreatments),
    [treatments]
  )

  const featuredTreatment = useMemo(
    () =>
      treatments.find((treatment) => treatment.name === FEATURED_TREATMENT_NAME) ??
      treatments.find((treatment) => treatment.featured) ??
      null,
    [treatments]
  )

  const defaultTreatment = useMemo(() => {
    if (!targetCategory) return null

    return treatments.find((treatment) => treatment.category === targetCategory) ?? null
  }, [targetCategory, treatments])

  const categoryGroups = useMemo(() => {
    const groups = []
    const byCategory = new Map()

    treatments.forEach((treatment) => {
      if (!byCategory.has(treatment.category)) {
        const group = { category: treatment.category, treatments: [] }
        byCategory.set(treatment.category, group)
        groups.push(group)
      }

      byCategory.get(treatment.category).treatments.push(treatment)
    })

    return groups
  }, [treatments])

  const selectedTreatmentId = manualSelection?.treatmentId ?? null
  const selectedOptionId = manualSelection?.optionId ?? null

  const selectedTreatment = useMemo(() => {
    if (selectedTreatmentId) {
      return treatments.find((treatment) => treatment.id === selectedTreatmentId) ?? defaultTreatment
    }

    return defaultTreatment
  }, [defaultTreatment, selectedTreatmentId, treatments])

  const selectedOption = useMemo(() => {
    if (!selectedTreatment) return null

    if (selectedOptionId) {
      return selectedTreatment.prices.find((option) => option.id === selectedOptionId) ?? selectedTreatment.prices[0] ?? null
    }

    return selectedTreatment.prices[0] ?? null
  }, [selectedOptionId, selectedTreatment])

  useEffect(() => {
    if (!targetCategory) return

    const element = document.getElementById(targetCategory)
    if (!element) return

    const yOffset = -80
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [targetCategory])

  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedTreatment || !selectedOption || !bookingForm.requestedDate || !businessSettings) {
        setAvailableSlots([])
        return
      }

      setIsAvailabilityLoading(true)
      setFeedbackMessage("")

      try {
        const slots = await getRequestableSlots({
          requestedDate: bookingForm.requestedDate,
          treatmentId: selectedTreatment.id,
          treatmentOptionId: selectedOption.id,
          businessSettings,
          availabilityExceptions: availabilityPeriods,
          reservations,
        })

        setAvailableSlots(slots)
        setAvailabilityMessage(
          slots.length > 0
            ? ""
            : "This date has no available appointment times for the selected treatment. Please choose another date."
        )
      } catch (error) {
        setAvailableSlots([])
        setAvailabilityMessage(error.message || "We couldn't load appointment times just now.")
      }

      setIsAvailabilityLoading(false)
    }

    loadSlots()
  }, [availabilityPeriods, bookingForm.requestedDate, businessSettings, reservations, selectedOption, selectedTreatment])

  const selectTreatment = (treatment, priceOption = null, openWizard = false) => {
    const nextOption = priceOption ?? treatment.prices[0] ?? null

    setManualSelection({
      treatmentId: treatment.id,
      optionId: nextOption?.id ?? null,
    })
    setBookingForm(getEmptyBookingForm())
    setBookingStep("Duration")
    setAvailableSlots([])
    setAvailabilityMessage("")
    setFeedbackMessage("")
    setSuccessBooking(null)
    setIsMobileWizardOpen(openWizard)
  }

  const selectOption = (priceOption) => {
    setManualSelection((current) => ({
      treatmentId: current?.treatmentId ?? selectedTreatment?.id ?? null,
      optionId: priceOption.id,
    }))
    setBookingForm((current) => ({
      ...current,
      startTime: "",
    }))
    setAvailableSlots([])
    setAvailabilityMessage("")
    setBookingStep("Date")
  }

  const updateBookingForm = (field, value) => {
    setBookingForm((current) => ({
      ...current,
      [field]: value,
    }))
    setFeedbackMessage("")
  }

  const chooseDate = (value) => {
    updateBookingForm("requestedDate", value)
    updateBookingForm("startTime", "")
    setBookingStep("Time")
  }

  const chooseTime = (slot) => {
    updateBookingForm("startTime", slot.label)
    setBookingStep("Details")
  }

  const validateDetailsStep = () => {
    if (!bookingForm.clientName.trim()) {
      setFeedbackMessage("Please enter your full name.")
      return false
    }

    if (!bookingForm.clientEmail.trim()) {
      setFeedbackMessage("Please enter your email address.")
      return false
    }

    if (!bookingForm.clientPhone.trim()) {
      setFeedbackMessage("Please enter your mobile number.")
      return false
    }

    return true
  }

  const goToReview = () => {
    if (!validateDetailsStep()) {
      return
    }

    setBookingStep("Health")
  }

  const continueToReview = () => {
    setBookingStep("Review")
  }

  const goBackStep = () => {
    const currentIndex = getStepIndex(bookingStep)

    if (currentIndex <= 0) {
      return
    }

    setBookingStep(BOOKING_STEPS[currentIndex - 1])
  }

  const submitBookingRequest = async () => {
    if (!selectedTreatment || !selectedOption) {
      setFeedbackMessage("Please choose a treatment and duration first.")
      return
    }

    setIsSubmitting(true)
    setFeedbackMessage("")

    try {
      const booking = await createBookingRequest({
        treatmentId: selectedTreatment.id,
        treatmentOptionId: selectedOption.id,
        requestedDate: bookingForm.requestedDate,
        startTime: bookingForm.startTime,
        clientName: bookingForm.clientName,
        clientEmail: bookingForm.clientEmail,
        clientPhone: bookingForm.clientPhone,
        healthInformation: {
          pregnant: bookingForm.pregnant,
          injuries: bookingForm.injuries,
          medicalConditions: bookingForm.medicalConditions,
          anythingElse: bookingForm.anythingElse,
        },
        additionalNotes: bookingForm.additionalNotes,
        source: BOOKING_SOURCE.WEBSITE,
        businessSettings,
        availabilityExceptions: availabilityPeriods,
        reservations,
      })

      setReservations((current) => [booking, ...current])
      setSuccessBooking(booking)
      setBookingStep("Review")
      setIsMobileWizardOpen(true)
    } catch (error) {
      setFeedbackMessage(error.message || "We couldn't send your booking request just now.")
    }

    setIsSubmitting(false)
  }

  const openMobileWizard = () => {
    if (!selectedTreatment || !selectedOption) return

    setIsMobileWizardOpen(true)
  }

  const closeMobileWizard = () => {
    setIsMobileWizardOpen(false)
  }

  const activeStepIndex = Math.max(getStepIndex(bookingStep), 0)

  const renderWizardContent = () => {
    if (!selectedTreatment || !selectedOption) {
      return <p className="booking-panel__placeholder">Select a treatment to begin your booking request.</p>
    }

    if (successBooking) {
      return (
        <div className="booking-success-card">
          <p className="booking-success-card__eyebrow">Booking Request Received</p>
          <h3 className="booking-success-card__title">Thank you.</h3>
          <p className="section-copy">
            Your booking request has been received.
          </p>
          <p className="section-copy">
            Beata will personally review your request and contact you shortly regarding confirmation and deposit payment.
          </p>
          <p className="section-copy">
            Your requested appointment time has been temporarily reserved while your request is being reviewed.
          </p>
        </div>
      )
    }

    return (
      <>
        <div className="booking-panel__header">
          <p className="booking-panel__eyebrow">Booking Request</p>
          <h3 className="booking-panel__title">{selectedTreatment.name}</h3>
          <p className="booking-panel__description">{selectedTreatment.description}</p>
        </div>

        <div className="booking-progress" aria-label="Booking progress">
          {BOOKING_STEPS.map((step, index) => (
            <span key={step} className={`booking-progress__step ${index <= activeStepIndex ? "is-active" : ""}`}>
              {step}
            </span>
          ))}
        </div>

        <div className="booking-panel__section">
          {bookingStep === "Duration" ? (
            <>
              <h4 className="booking-panel__section-title">Choose your duration</h4>
              <div className="booking-options">
                {selectedTreatment.prices.map((priceOption) => (
                  <button
                    type="button"
                    className={`booking-option-button ${selectedOption?.id === priceOption.id ? "is-selected" : ""}`}
                    key={`${selectedTreatment.id}-${priceOption.id}`}
                    onClick={() => selectOption(priceOption)}
                  >
                    {priceOption.time} - {priceOption.price}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {bookingStep === "Date" ? (
            <>
              <h4 className="booking-panel__section-title">Choose a preferred date</h4>
              <label className="booking-field">
                <span>Date</span>
                <input
                  className="booking-input"
                  type="date"
                  value={bookingForm.requestedDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => chooseDate(event.target.value)}
                />
              </label>
            </>
          ) : null}

          {bookingStep === "Time" ? (
            <>
              <h4 className="booking-panel__section-title">Choose an available time</h4>
              <label className="booking-field">
                <span>Date</span>
                <input
                  className="booking-input"
                  type="date"
                  value={bookingForm.requestedDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => chooseDate(event.target.value)}
                />
              </label>

              {isAvailabilityLoading ? <p className="booking-helper-copy">Loading available appointment times...</p> : null}
              {availabilityMessage ? <p className="booking-error-message">{availabilityMessage}</p> : null}

              {availableSlots.length > 0 ? (
                <div className="booking-time-grid">
                  {availableSlots.map((slot) => (
                    <button type="button" key={slot.start.toISOString()} className="booking-time-button" onClick={() => chooseTime(slot)}>
                      {slot.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          ) : null}

          {bookingStep === "Details" ? (
            <>
              <h4 className="booking-panel__section-title">Your details</h4>
              <div className="booking-form-grid">
                <label className="booking-field">
                  <span>Full Name</span>
                  <input className="booking-input" value={bookingForm.clientName} onChange={(event) => updateBookingForm("clientName", event.target.value)} />
                </label>
                <label className="booking-field">
                  <span>Email Address</span>
                  <input className="booking-input" type="email" value={bookingForm.clientEmail} onChange={(event) => updateBookingForm("clientEmail", event.target.value)} />
                </label>
                <label className="booking-field">
                  <span>Mobile Number</span>
                  <input className="booking-input" type="tel" value={bookingForm.clientPhone} onChange={(event) => updateBookingForm("clientPhone", event.target.value)} />
                </label>
              </div>

              <div className="booking-panel__actions">
                <button type="button" className="featured-secondary-button" onClick={goBackStep}>
                  Back
                </button>
                <button type="button" className="featured-primary-button" onClick={goToReview}>
                  Continue
                </button>
              </div>
            </>
          ) : null}

          {bookingStep === "Health" ? (
            <>
              <h4 className="booking-panel__section-title">Health information</h4>
              <div className="booking-form-grid">
                <label className="booking-field">
                  <span>Are you pregnant?</span>
                  <select className="booking-input" value={bookingForm.pregnant} onChange={(event) => updateBookingForm("pregnant", event.target.value)}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </label>
                <label className="booking-field">
                  <span>Do you have any injuries?</span>
                  <textarea className="booking-input booking-textarea" value={bookingForm.injuries} onChange={(event) => updateBookingForm("injuries", event.target.value)} />
                </label>
                <label className="booking-field">
                  <span>Any medical conditions?</span>
                  <textarea className="booking-input booking-textarea" value={bookingForm.medicalConditions} onChange={(event) => updateBookingForm("medicalConditions", event.target.value)} />
                </label>
                <label className="booking-field">
                  <span>Anything else Beata should know?</span>
                  <textarea className="booking-input booking-textarea" value={bookingForm.anythingElse} onChange={(event) => updateBookingForm("anythingElse", event.target.value)} />
                </label>
                <label className="booking-field">
                  <span>Additional notes (optional)</span>
                  <textarea className="booking-input booking-textarea" value={bookingForm.additionalNotes} onChange={(event) => updateBookingForm("additionalNotes", event.target.value)} />
                </label>
              </div>

              <div className="booking-panel__actions">
                <button type="button" className="featured-secondary-button" onClick={goBackStep}>
                  Back
                </button>
                <button type="button" className="featured-primary-button" onClick={continueToReview}>
                  Review Booking
                </button>
              </div>
            </>
          ) : null}

          {bookingStep === "Review" ? (
            <>
              <h4 className="booking-panel__section-title">Review your booking request</h4>
              <div className="booking-review-card">
                <div className="booking-review-card__section">
                  <strong>Treatment</strong>
                  <span>{selectedTreatment.name}</span>
                  <span>
                    {selectedOption.time} - {selectedOption.price}
                  </span>
                </div>

                <div className="booking-review-card__section">
                  <strong>Appointment</strong>
                  <span>{formatBookingDate(bookingForm.requestedDate)}</span>
                  <span>{bookingForm.startTime}</span>
                </div>

                <div className="booking-review-card__section">
                  <strong>Customer</strong>
                  <span>{bookingForm.clientName}</span>
                  <span>{bookingForm.clientEmail}</span>
                  <span>{bookingForm.clientPhone}</span>
                </div>

                <div className="booking-review-card__section">
                  <strong>Health Information</strong>
                  <span>Pregnant: {bookingForm.pregnant}</span>
                  <span>Injuries: {bookingForm.injuries || "None provided"}</span>
                  <span>Medical conditions: {bookingForm.medicalConditions || "None provided"}</span>
                  <span>Anything else: {bookingForm.anythingElse || "None provided"}</span>
                  {bookingForm.additionalNotes ? <span>Additional notes: {bookingForm.additionalNotes}</span> : null}
                </div>
              </div>

              {feedbackMessage ? <p className="booking-error-message">{feedbackMessage}</p> : null}

              <div className="booking-panel__actions">
                <button type="button" className="featured-secondary-button" onClick={goBackStep}>
                  Back
                </button>
                <button type="button" className="featured-primary-button" onClick={submitBookingRequest} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Booking Request"}
                </button>
              </div>
            </>
          ) : null}
        </div>

        {feedbackMessage && bookingStep !== "Review" ? <p className="booking-error-message">{feedbackMessage}</p> : null}
      </>
    )
  }

  return (
    <section className="treatments-page">
      <Seo
        title="Treatments | Retreat by the Mournes"
        description="Discover therapeutic massage, sports massage, facials and signature wellness treatments using Neal's Yard Remedies Organic products."
        path="/treatments"
        structuredData={structuredData}
      />
      <h1 className="treatments-title">Book Your Treatment</h1>

      <div className="treatments-layout">
        <div className={`treatments-list ${selectedTreatment ? "has-mobile-booking-bar" : ""}`}>
          {featuredTreatment ? (
            <section className="featured-treatment">
              <div className="featured-label-row">
                Signature Treatment
                <span className="treatment-new-badge">New</span>
              </div>

              <div className="featured-header">
                <h2 className="featured-name">{featuredTreatment.name}</h2>
                <p className="featured-meta">
                  {featuredTreatment.prices[0]?.time} • {featuredTreatment.prices[0]?.price}
                </p>
              </div>

              <p className="featured-intro">{FEATURED_INTRODUCTION}</p>
              <p className="featured-description">{featuredTreatment.description}</p>

              <div className="featured-actions">
                <button
                  className="featured-primary-button"
                  onClick={() => selectTreatment(featuredTreatment, featuredTreatment.prices[0] ?? null, true)}
                  disabled={featuredTreatment.bookingEnabled === false}
                >
                  {featuredTreatment.bookingEnabled === false ? "Booking Coming Soon" : "Request This Treatment"}
                </button>

                <button className="featured-secondary-button" onClick={() => selectTreatment(featuredTreatment)}>
                  View In Booking Panel
                </button>
              </div>
            </section>
          ) : null}

          {categoryGroups.map((group) => (
            <div key={group.category}>
              <h2 id={group.category} style={{ margin: "20px 0 10px", fontFamily: "var(--font-heading)" }}>
                {group.category}
              </h2>

              {group.treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  id={treatment.name}
                  onClick={() => selectTreatment(treatment)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      selectTreatment(treatment)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedTreatment?.id === treatment.id}
                  className={`treatment-card ${selectedTreatment?.id === treatment.id ? "is-selected" : ""}`}
                  style={{
                    padding: "20px",
                    borderRadius: "14px",
                    background: selectedTreatment?.id === treatment.id ? "#6f8f7a" : "#f5f5f5",
                    color: selectedTreatment?.id === treatment.id ? "#fff" : "#2a2a2a",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                    transition: "all 0.25s ease",
                    transform: "translateY(0) scale(1)",
                  }}
                  onMouseEnter={(event) => {
                    if (selectedTreatment?.id !== treatment.id) {
                      event.currentTarget.style.transform = "translateY(-6px) scale(1.02)"
                      event.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.10)"
                      event.currentTarget.style.background = "#eeeeee"
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (selectedTreatment?.id !== treatment.id) {
                      event.currentTarget.style.transform = "translateY(0) scale(1)"
                      event.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.04)"
                      event.currentTarget.style.background = "#f5f5f5"
                    }
                  }}
                >
                  {treatment.name === FACIAL_TREATMENT_NAME ? (
                    <div className="treatment-card__eyebrow-row">
                      <span className="treatment-card__eyebrow">Facial Treatment</span>
                      <span className="treatment-new-badge">New</span>
                    </div>
                  ) : null}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontFamily: "var(--font-heading)" }}>{treatment.name}</strong>
                    {selectedTreatment?.id === treatment.id ? (
                      <span className="treatment-card__selected-badge">&#10003; Selected</span>
                    ) : (
                      <span style={{ opacity: 0.4 }}>&rarr;</span>
                    )}
                  </div>
                  <p style={{ fontSize: "12px", opacity: 0.6 }}>
                    {treatment.prices[0]?.time} - {treatment.prices[0]?.price}
                  </p>
                  <p style={{ fontSize: "13px", opacity: 0.8 }}>{treatment.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="booking-panel">{renderWizardContent()}</div>
      </div>

      {selectedTreatment && selectedOption && !successBooking ? (
        <div className="mobile-booking-bar" aria-live="polite">
          <div className="mobile-booking-bar__content">
            <div className="mobile-booking-bar__details">
              <p className="mobile-booking-bar__eyebrow">Ready to Book</p>
              <p className="mobile-booking-bar__title">{selectedTreatment.name}</p>
              <p className="mobile-booking-bar__meta">
                {selectedOption.time} &bull; {selectedOption.price}
              </p>
            </div>

            <button type="button" className="mobile-booking-bar__button" onClick={openMobileWizard} disabled={selectedTreatment.bookingEnabled === false}>
              {selectedTreatment.bookingEnabled === false ? "Booking Coming Soon" : "Request Appointment"}
            </button>
          </div>
        </div>
      ) : null}

      {isMobileWizardOpen ? (
        <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
          <div className="booking-modal__backdrop" onClick={closeMobileWizard} />
          <div className="booking-modal__panel">
            <div className="booking-modal__header">
              <h2 id="booking-modal-title">Booking Request</h2>
              <button type="button" className="featured-secondary-button" onClick={closeMobileWizard}>
                Close
              </button>
            </div>
            {renderWizardContent()}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Treatments

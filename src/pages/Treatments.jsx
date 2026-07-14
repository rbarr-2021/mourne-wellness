import "../styles/global.css"
import "../styles/treatments.css"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import Seo from "../components/Seo"
import { listPublicTreatments } from "../lib/supabase/database"
import {
  buildTreatmentsStructuredData,
  FACIAL_TREATMENT_NAME,
  FEATURED_INTRODUCTION,
  FEATURED_TREATMENT_NAME,
  LEGACY_TREATMENTS,
  mapTreatmentToPublicTreatment,
} from "../lib/treatments"

const fallbackTreatments = LEGACY_TREATMENTS.map(mapTreatmentToPublicTreatment)

function Treatments() {
  const location = useLocation()
  const targetCategory = location.state?.targetCategory ?? null
  const [treatments, setTreatments] = useState(fallbackTreatments)
  const [manualSelection, setManualSelection] = useState(null)

  useEffect(() => {
    const loadTreatments = async () => {
      const { data } = await listPublicTreatments()

      if (data?.length) {
        setTreatments(data.map(mapTreatmentToPublicTreatment))
      }
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

  const selectedTreatment = useMemo(() => {
    if (manualSelection?.treatmentId) {
      return treatments.find((treatment) => treatment.id === manualSelection.treatmentId) ?? defaultTreatment
    }

    return defaultTreatment
  }, [defaultTreatment, manualSelection?.treatmentId, treatments])

  const selectedOption = useMemo(() => {
    if (!selectedTreatment) return null

    if (manualSelection?.optionId) {
      return selectedTreatment.prices.find((option) => option.id === manualSelection.optionId) ?? selectedTreatment.prices[0] ?? null
    }

    return selectedTreatment.prices[0] ?? null
  }, [manualSelection?.optionId, selectedTreatment])

  useEffect(() => {
    if (!targetCategory) return

    const element = document.getElementById(targetCategory)
    if (!element) return

    const yOffset = -80
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [targetCategory])

  const selectTreatment = (treatment, priceOption = treatment.prices[0]) => {
    setManualSelection({
      treatmentId: treatment.id,
      optionId: priceOption?.id ?? null,
    })
  }

  const openWhatsAppBooking = (treatment, priceOption) => {
    if (!treatment || !priceOption || treatment.bookingEnabled === false) return

    const message = `Hi Beata, I'd like to book: ${treatment.name} (${priceOption.time}) - ${priceOption.price}.`
    window.open(`https://wa.me/447591383215?text=${encodeURIComponent(message)}`)
  }

  const bookTreatment = () => {
    openWhatsAppBooking(selectedTreatment, selectedOption)
  }

  const bookFeaturedTreatment = () => {
    if (!featuredTreatment) return

    openWhatsAppBooking(featuredTreatment, featuredTreatment.prices[0] ?? null)
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
                <button className="featured-primary-button" onClick={bookFeaturedTreatment} disabled={featuredTreatment.bookingEnabled === false}>
                  {featuredTreatment.bookingEnabled === false ? "Booking Coming Soon" : "Book This Treatment"}
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

        <div className="booking-panel">
          {!selectedTreatment ? (
            <p style={{ color: "#777" }}>Select a treatment to begin booking</p>
          ) : (
            <>
              <h3 style={{ fontFamily: "var(--font-heading)" }}>{selectedTreatment.name}</h3>
              <p style={{ fontSize: "13px", color: "#666" }}>{selectedTreatment.description}</p>

              <div className="booking-options">
                {selectedTreatment.prices.map((priceOption) => (
                  <button
                    className="booking-option-button"
                    key={`${selectedTreatment.id}-${priceOption.id}`}
                    onClick={() => selectTreatment(selectedTreatment, priceOption)}
                    style={{
                      border: selectedOption?.id === priceOption.id ? "1px solid #6f8f7a" : "1px solid #d6d6d6",
                      background: selectedOption?.id === priceOption.id ? "#6f8f7a" : "#f7f7f7",
                      color: selectedOption?.id === priceOption.id ? "#fff" : "#333",
                    }}
                  >
                    {priceOption.time} - {priceOption.price}
                  </button>
                ))}
              </div>

              <div className="booking-summary">
                <p>
                  <strong>Selected:</strong>
                  <br />
                  {selectedOption?.time} - {selectedOption?.price}
                </p>
                {selectedTreatment.bookingEnabled === false ? (
                  <p style={{ marginBottom: 0, color: "#8a4d4d" }}>This treatment is visible on the site but not currently open for booking.</p>
                ) : null}
              </div>

              <button className="booking-confirm-button" onClick={bookTreatment} disabled={selectedTreatment.bookingEnabled === false}>
                {selectedTreatment.bookingEnabled === false ? "Booking Coming Soon" : "Confirm & Book via WhatsApp"}
              </button>
            </>
          )}
        </div>
      </div>

      {selectedTreatment && selectedOption ? (
        <div className="mobile-booking-bar" aria-live="polite">
          <div className="mobile-booking-bar__content">
            <div className="mobile-booking-bar__details">
              <p className="mobile-booking-bar__eyebrow">Ready to Book</p>
              <p className="mobile-booking-bar__title">{selectedTreatment.name}</p>
              <p className="mobile-booking-bar__meta">
                {selectedOption.time} &bull; {selectedOption.price}
              </p>
            </div>

            <button type="button" className="mobile-booking-bar__button" onClick={bookTreatment} disabled={selectedTreatment.bookingEnabled === false}>
              {selectedTreatment.bookingEnabled === false ? "Booking Coming Soon" : "Book via WhatsApp "}
              {selectedTreatment.bookingEnabled === false ? null : <span aria-hidden="true">&rarr;</span>}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Treatments

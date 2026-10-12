import "../styles/global.css"
import "../styles/treatments.css"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

const treatments = [
  {
    category: "Signature Experiences",
    name: "Neck, Head, and Face Massage",
    description: "Melt away tension and restore a natural glow with a calming massage for the neck, head, and face.",
    prices: [
      { time: "60 min", price: "\u00A355" },
      { time: "90 min", price: "\u00A380" },
    ],
  },
  {
    category: "Signature Experiences",
    name: "Back, Neck, and Head with Hot Stone Massage",
    description: "Release tension and calm the mind with soothing hot stones.",
    prices: [{ time: "60 min", price: "\u00A365" }],
  },
  {
    category: "Signature Experiences",
    name: "Full Body Massage (Lomi Lomi Inspired)",
    description: "Flowing, rhythmic movements designed to restore balance and relax the body.",
    prices: [
      { time: "60 min", price: "\u00A355" },
      { time: "90 min", price: "\u00A380" },
    ],
  },
  {
    category: "Signature Experiences",
    name: "Full Body Hot Stone Massage",
    description: "Deep relaxation using heated stones to ease muscle tension.",
    prices: [{ time: "70 min", price: "\u00A370" }],
  },
  {
    category: "Signature Experiences",
    name: "Nurturing Full Body Pregnancy Massage",
    description: "A soothing massage designed to support relaxation and wellbeing during pregnancy.",
    prices: [{ time: "70 min", price: "\u00A360" }],
  },
  {
    category: "Specialist Recovery",
    name: "Therapeutic Deep Tissue Full Body Therapy",
    description: "Target deep muscle tension and restore balance. Best for stress and recovery.",
    prices: [
      { time: "60 min", price: "\u00A355" },
      { time: "90 min", price: "\u00A380" },
    ],
  },
  {
    category: "Specialist Recovery",
    name: "Sports Massage Therapy",
    description: "Focused treatment to ease muscle tension and support recovery.",
    prices: [
      { time: "60 min", price: "\u00A355" },
      { time: "90 min", price: "\u00A380" },
    ],
  },
  {
    category: "Specialist Recovery",
    name: "Myofascial Release Therapy",
    description: "Restorative treatment to release deep tension and improve mobility.",
    prices: [
      { time: "60 min", price: "\u00A355" },
      { time: "90 min", price: "\u00A380" },
    ],
  },
  {
    category: "Signature Treatment",
    name: "Mourne Recovery Therapy",
    description: "A tailored blend of sports massage and myofascial release for full-body reset.",
    prices: [{ time: "90 min", price: "\u00A380" }],
  },
  {
    category: "Signature Treatment",
    name: "Mourne Rocks Retreat & Recovery",
    isNew: true,
    description:
      "A restorative two-hour treatment designed to release muscular tension while nourishing the skin and promoting deep relaxation. This signature experience combines a back sports massage with hot stones to ease tightness and stiffness in the back, shoulders, and neck, together with a Nourishing & Therapeutic Facial using Neal's Yard Remedies Organic skincare. The facial includes a cleanse, exfoliation, nourishing mask, gentle facial lymphatic drainage, and therapeutic massage to the face, neck, shoulders, and scalp to help reduce puffiness, release tension, and restore a natural glow. Perfect for those seeking both therapeutic bodywork and a deeply relaxing facial experience in the tranquil surroundings of Retreat by the Mournes.",
    prices: [{ time: "2 hours", price: "\u00A3115" }],
  },
  {
    category: "Signature Treatment",
    name: "The Mourne Head-to-Toe Retreat",
    subtitle: "From Cold Mountain Feet to Warm, Grounded Feet",
    isNew: true,
    description:
      "After a day exploring the Mournes, retreat into warmth with a deeply restorative treatment designed to soothe tired feet, ease tension and restore calm. Enjoy gentle foot exfoliation, a warming foot and lower-leg massage with hot stones, myofascial release for the back, and a soothing massage of the shoulders, neck, head, scalp, forearms and hands. Inspired by the comfort of a warm retreat after time outdoors, this is your invitation to slow down, switch off and feel nurtured from head to toe.",
    prices: [{ time: "90 min", price: "\u00A390" }],
  },
  {
    category: "Nurture & Restore",
    name: "Gentle Back, Neck, and Head Massage",
    description: "Gentle treatment to ease tension and restore calm.",
    prices: [{ time: "60 min", price: "\u00A355" }],
  },
  {
    category: "Nurture & Restore",
    name: "Head & Neck Massage with Essential Oils",
    description: "Calming massage to relax the mind and support restful sleep.",
    prices: [{ time: "60 min", price: "\u00A355" }],
  },
  {
    category: "Nurture & Restore",
    name: "Nourishing & Therapeutic Facial",
    description:
      "A deeply relaxing facial designed to nourish your skin while easing tension and promoting overall wellbeing. Using Neal's Yard Remedies Organic skincare, this treatment includes a cleanse, exfoliation, nourishing mask, gentle facial lymphatic drainage, and therapeutic massage to the face, neck, shoulders, and scalp. The extended neck, shoulder, and head massage helps to ease stiffness, release built-up tension, and encourage deep relaxation. Perfect for reducing puffiness, relieving stress, and leaving your skin feeling hydrated, refreshed, and naturally radiant.",
    prices: [{ time: "75 min", price: "\u00A375" }],
  },
  {
    category: "Express Rituals",
    name: "Tension Release Back Therapy",
    description: "Quick treatment to relieve back, neck, and shoulder tension.",
    prices: [{ time: "30 min", price: "\u00A330" }],
  },
  {
    category: "Express Rituals",
    name: "Revitalizing Head & Face Massage",
    description: "Relaxing treatment to ease tension and refresh your skin.",
    prices: [{ time: "30 min", price: "\u00A330" }],
  },
  {
    category: "Express Rituals",
    name: "Grounding Foot Ritual",
    description: "Revives tired feet and restores comfort.",
    prices: [{ time: "30 min", price: "\u00A330" }],
  },
  {
    category: "Express Rituals",
    name: "Grounding Hand Ritual",
    description: "Relieves tension in hands and wrists.",
    prices: [{ time: "30 min", price: "\u00A330" }],
  },
]

const categories = [
  "Signature Experiences",
  "Specialist Recovery",
  "Signature Treatment",
  "Nurture & Restore",
  "Express Rituals",
]

const featuredIntroduction =
  "Our signature two-hour treatment combining therapeutic sports massage, soothing hot stone therapy and a deeply nourishing Neal's Yard Remedies Organic facial. Designed to restore tired muscles, calm the mind and leave you feeling completely refreshed."

const enhancementCatalog = {
  hotStones: {
    id: "hotStones",
    name: "Targeted Hot Stone Therapy",
    description: "Warm, focused stone work for areas holding tension.",
    price: 12,
    minutes: 15,
  },
  scalpRitual: {
    id: "scalpRitual",
    name: "Scalp, Head & Face Ritual",
    description: "A deeply relaxing finish for the scalp, head and face.",
    price: 18,
    minutes: 20,
  },
  footRevival: {
    id: "footRevival",
    name: "Foot & Lower-Leg Revival",
    description: "Restorative care for tired feet and lower legs.",
    price: 18,
    minutes: 20,
  },
  extraTime: {
    id: "extraTime",
    name: "Extra 15 Minutes",
    description: "Additional time focused on the area that needs it most.",
    price: 15,
    minutes: 15,
  },
  recoveryBoots: {
    id: "recoveryBoots",
    name: "Recovery Boots",
    description: "Post-treatment recovery support for tired legs.",
    price: 15,
    minutes: 25,
    comingSoon: true,
  },
}

const treatmentEnhancements = {
  "Neck, Head, and Face Massage": ["footRevival"],
  "Back, Neck, and Head with Hot Stone Massage": ["footRevival"],
  "Full Body Massage (Lomi Lomi Inspired)": ["hotStones", "scalpRitual"],
  "Full Body Hot Stone Massage": ["scalpRitual"],
  "Nurturing Full Body Pregnancy Massage": [],
  "Therapeutic Deep Tissue Full Body Therapy": ["hotStones", "recoveryBoots"],
  "Sports Massage Therapy": ["hotStones", "recoveryBoots"],
  "Myofascial Release Therapy": ["hotStones", "recoveryBoots"],
  "Mourne Recovery Therapy": ["hotStones", "scalpRitual", "recoveryBoots"],
  "Mourne Rocks Retreat & Recovery": ["recoveryBoots"],
  "The Mourne Head-to-Toe Retreat": ["recoveryBoots"],
  "Gentle Back, Neck, and Head Massage": ["hotStones", "footRevival"],
  "Head & Neck Massage with Essential Oils": ["hotStones", "footRevival"],
  "Nourishing & Therapeutic Facial": ["footRevival"],
  "Tension Release Back Therapy": ["hotStones", "extraTime"],
  "Revitalizing Head & Face Massage": ["footRevival", "extraTime"],
  "Grounding Foot Ritual": ["scalpRitual", "extraTime"],
  "Grounding Hand Ritual": ["footRevival", "extraTime"],
}

const parsePrice = (price = "") =>
  Number(String(price).replace(/[^\d.]/g, "")) || 0
function Treatments() {
  const location = useLocation()
  const targetCategory = location.state?.targetCategory ?? null
  const defaultTreatment = targetCategory
    ? treatments.find((treatment) => treatment.category === targetCategory) ?? null
    : null
  const featuredTreatment = treatments.find((treatment) => treatment.name === "Mourne Rocks Retreat & Recovery")

  const [manualSelection, setManualSelection] = useState(null)
  const [selectedEnhancements, setSelectedEnhancements] = useState([])
  const [enhancementsOpen, setEnhancementsOpen] = useState(false)
  const bookingPanelRef = useRef(null)
  const selectionMatchesCategory = manualSelection?.category === targetCategory
  const selectedTreatment = selectionMatchesCategory ? manualSelection.treatment : defaultTreatment
  const selectedOption = selectionMatchesCategory ? manualSelection.option : defaultTreatment?.prices[0] ?? null

  const availableEnhancements = selectedTreatment
    ? (treatmentEnhancements[selectedTreatment.name] ?? [])
        .map((id) => enhancementCatalog[id])
        .filter(Boolean)
    : []

  const selectedEnhancementDetails = availableEnhancements.filter(
    (enhancement) =>
      !enhancement.comingSoon &&
      selectedEnhancements.includes(enhancement.id)
  )

  const enhancementTotal = selectedEnhancementDetails.reduce(
    (total, enhancement) => total + enhancement.price,
    0
  )

  const enhancementMinutes = selectedEnhancementDetails.reduce(
    (total, enhancement) => total + enhancement.minutes,
    0
  )

  const bookingTotal =
    parsePrice(selectedOption?.price) + enhancementTotal

  const toggleEnhancement = (enhancement) => {
    if (enhancement.comingSoon) return

    setSelectedEnhancements((current) =>
      current.includes(enhancement.id)
        ? current.filter((id) => id !== enhancement.id)
        : [...current, enhancement.id]
    )
  }

  useEffect(() => {
    if (!targetCategory) return

    const element = document.getElementById(targetCategory)
    if (!element) return

    const yOffset = -80
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [targetCategory])

  useEffect(() => {
    if (!manualSelection || manualSelection.category !== targetCategory) return

    const panel = bookingPanelRef.current
    if (!panel) return

    // Run after the selected treatment renders, and clear the fixed site header.
    const header = document.querySelector(".navbar")
    const headerBottom = header?.getBoundingClientRect().bottom ?? 0
    const clearance = Math.max(0, headerBottom) + 16
    const panelTop = panel.getBoundingClientRect().top

    window.scrollTo({
      top: Math.max(0, window.scrollY + panelTop - clearance),
      behavior: "smooth",
    })
  }, [manualSelection, targetCategory])

  const selectTreatment = (treatment, priceOption = treatment.prices[0]) => {
        if (selectedTreatment?.name !== treatment.name) {
      setSelectedEnhancements([])
      setEnhancementsOpen(false)
    }
setManualSelection({
      category: targetCategory,
      treatment,
      option: priceOption,
    })
  }

  const bookTreatment = () => {
    if (!selectedTreatment || !selectedOption) return

    const enhancementLines = selectedEnhancementDetails.length
      ? selectedEnhancementDetails
          .map(
            (enhancement) =>
              `- ${enhancement.name} (+\u00A3${enhancement.price})`
          )
          .join("\n")
      : "- None"

    const additionalTimeLine =
      enhancementMinutes > 0
        ? `\nAdditional treatment time: approximately ${enhancementMinutes} minutes`
        : ""

    const message = `Hi Beata, I'd like to request:

${selectedTreatment.name}
${selectedOption.time} - ${selectedOption.price}

Enhancements:
${enhancementLines}
${additionalTimeLine}

Total: \u00A3${bookingTotal}

Please let me know what availability you have. Thank you.`

    window.open(
      `https://wa.me/447591383215?text=${encodeURIComponent(message)}`
    )
  }

  const bookFeaturedTreatment = () => {
    if (!featuredTreatment) return

    const featuredOption = featuredTreatment.prices[0]
    const message = `Hi Beata, I'd like to book: ${featuredTreatment.name} (${featuredOption.time}) - ${featuredOption.price}.`
    window.open(`https://wa.me/447591383215?text=${encodeURIComponent(message)}`)
  }

  return (
    <section style={{ padding: "100px 20px", background: "linear-gradient(to bottom, #f8f8f8, #ffffff)" }}>
      <h1 style={{ textAlign: "center", fontFamily: "var(--font-heading)", marginBottom: "40px" }}>
        Book Your Treatment
      </h1>

      <div className="treatments-layout">
        <div className="treatments-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {featuredTreatment && (
            <section
              className="featured-treatment-card"
              style={{
                marginBottom: "18px",
                padding: "32px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, rgba(236, 232, 225, 0.75), rgba(255,255,255,0.95))",
                border: "1px solid rgba(198, 166, 100, 0.38)",
                boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
              }}
            >
              <button
                type="button"
                className="featured-treatment-select"
                aria-label={`Select ${featuredTreatment.name} for booking`}
                onClick={() => selectTreatment(featuredTreatment)}
              />
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(198, 166, 100, 0.35)",
                  color: "var(--text-dark)",
                  fontSize: "12px",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                <span aria-hidden="true">{"\u2606"}</span>
                Signature Treatment
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "10px",
                    minWidth: 0,
                    maxWidth: "100%",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(30px, 4vw, 42px)",
                      lineHeight: "1.12",
                      color: "var(--text-dark)",
                    }}
                  >
                    {featuredTreatment.name}
                  </h2>
                  <span
                    style={{
                      display: "inline-flex",
                      flexShrink: 0,
                      padding: "5px 10px",
                      borderRadius: "999px",
                      border: "1px solid rgba(198, 166, 100, 0.45)",
                      background: "#f4eddf",
                      color: "#80652e",
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "1.2px",
                      lineHeight: "1.4",
                    }}
                  >
                    NEW
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(16px, 2vw, 18px)",
                    color: "var(--primary-dark)",
                    letterSpacing: "0.3px",
                    fontWeight: "600",
                  }}
                >
                  {featuredTreatment.prices[0].time}{" \u2022 "}{featuredTreatment.prices[0].price}
                </p>
              </div>

              <p
                style={{
                  marginTop: "18px",
                  marginBottom: "16px",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "var(--text-light)",
                }}
              >
                {featuredIntroduction}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "1.85",
                  color: "var(--text-light)",
                }}
              >
                {featuredTreatment.description}
              </p>

              <div
                className="featured-treatment-actions"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px",
                  marginTop: "26px",
                }}
              >
                <button
                  onClick={bookFeaturedTreatment}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "14px",
                    border: "1px solid #6f8f7a",
                    background: "#6f8f7a",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "500",
                    letterSpacing: "0.3px",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "#5f7f6c"
                    event.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "#6f8f7a"
                    event.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  Book This Treatment
                </button>

                <button
                  onClick={() => selectTreatment(featuredTreatment)}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "14px",
                    border: "1px solid rgba(111, 143, 122, 0.28)",
                    background: "rgba(255,255,255,0.7)",
                    color: "var(--text-dark)",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "500",
                    letterSpacing: "0.3px",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "#ffffff"
                    event.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "rgba(255,255,255,0.7)"
                    event.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  View In Booking Panel
                </button>
              </div>
            </section>
          )}

          {categories.map((category) => (
            <div key={category}>
              <h2 id={category} style={{ margin: "20px 0 10px", fontFamily: "var(--font-heading)" }}>
                {category}
              </h2>

              {treatments
                .filter((treatment) => treatment.category === category)
                .map((treatment) => (
                  <div
                    key={treatment.name}
                    id={treatment.name}
                    onClick={() => selectTreatment(treatment)}
                    style={{
                      padding: "20px",
                      borderRadius: "14px",
                      background: selectedTreatment === treatment ? "#6f8f7a" : "#f5f5f5",
                      color: selectedTreatment === treatment ? "#fff" : "#2a2a2a",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                      transition: "all 0.25s ease",
                      transform: "translateY(0) scale(1)",
                    }}
                    onMouseEnter={(event) => {
                      if (selectedTreatment !== treatment) {
                        event.currentTarget.style.transform = "translateY(-6px) scale(1.02)"
                        event.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.10)"
                        event.currentTarget.style.background = "#eeeeee"
                      }
                    }}
                    onMouseLeave={(event) => {
                      if (selectedTreatment !== treatment) {
                        event.currentTarget.style.transform = "translateY(0) scale(1)"
                        event.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.04)"
                        event.currentTarget.style.background = "#f5f5f5"
                      }
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <strong style={{ fontFamily: "var(--font-heading)" }}>
                            {treatment.name}
                          </strong>

                          {treatment.isNew && (
                            <span className="treatment-new-badge">NEW</span>
                          )}
                        </div>

                        {treatment.subtitle && (
                          <p
                            style={{
                              margin: "6px 0 0",
                              fontSize: "12px",
                              fontStyle: "italic",
                              opacity: 0.72,
                            }}
                          >
                            {treatment.subtitle}
                          </p>
                        )}
                      </div>

                      <span style={{ opacity: 0.4, flexShrink: 0 }}>&rarr;</span>
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

        <div
          className="treatments-booking-panel"
          ref={bookingPanelRef}
          style={{
            alignSelf: "start",
            padding: "30px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {!selectedTreatment ? (
            <p style={{ color: "#777" }}>Select a treatment to begin booking</p>
          ) : (
            <>
              <h3 style={{ fontFamily: "var(--font-heading)" }}>{selectedTreatment.name}</h3>
              <p style={{ fontSize: "13px", color: "#666" }}>{selectedTreatment.description}</p>

              <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                {selectedTreatment.prices.map((priceOption) => (
                  <button
                    key={`${selectedTreatment.name}-${priceOption.time}`}
                    onClick={() => selectTreatment(selectedTreatment, priceOption)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "999px",
                      border: selectedOption === priceOption ? "1px solid #6f8f7a" : "1px solid #d6d6d6",
                      background: selectedOption === priceOption ? "#6f8f7a" : "#f7f7f7",
                      color: selectedOption === priceOption ? "#fff" : "#333",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {priceOption.time} - {priceOption.price}
                  </button>
                ))}
              </div>
              {availableEnhancements.length > 0 && (
                <div className="retreat-enhancements retreat-enhancements--compact">
                  <button
                    type="button"
                    className="retreat-enhancements__trigger"
                    onClick={() => setEnhancementsOpen((open) => !open)}
                    aria-expanded={enhancementsOpen}
                  >
                    <div>
                      <span>Enhance your retreat</span>
                      <small>
                        {availableEnhancements.every((item) => item.comingSoon)
                          ? "Recovery Boots · launching soon"
                          : `${availableEnhancements.length} optional ${
                              availableEnhancements.length === 1 ? "addition" : "additions"
                            } available`}
                      </small>
                    </div>

                    <span
                      className={`retreat-enhancements__chevron${
                        enhancementsOpen ? " is-open" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>

                  {enhancementsOpen && (
                    <div className="retreat-enhancements__drawer">
                      {availableEnhancements.map((enhancement) => {
                        const isSelected =
                          selectedEnhancements.includes(enhancement.id)

                        if (enhancement.comingSoon) {
                          return (
                            <div
                              key={enhancement.id}
                              className="retreat-enhancement-soon"
                            >
                              <div>
                                <strong>{enhancement.name}</strong>
                                <p>{enhancement.description}</p>
                              </div>

                              <span>Launching soon</span>
                            </div>
                          )
                        }

                        return (
                          <button
                            key={enhancement.id}
                            type="button"
                            className={`retreat-enhancement-choice${
                              isSelected ? " is-selected" : ""
                            }`}
                            onClick={() => toggleEnhancement(enhancement)}
                            aria-pressed={isSelected}
                          >
                            <div>
                              <strong>{enhancement.name}</strong>
                              <p>{enhancement.description}</p>
                              <small>+{enhancement.minutes} min</small>
                            </div>

                            <div className="retreat-enhancement-choice__price">
                              +{"\u00A3"}{enhancement.price}
                              <span>{isSelected ? "✓" : "+"}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="retreat-booking-summary retreat-booking-summary--minimal">
                <span className="retreat-booking-summary__eyebrow">
                  Your retreat
                </span>

                <div className="retreat-booking-summary__treatment">
                  <div>
                    <strong>{selectedTreatment.name}</strong>
                    <span>{selectedOption?.time}</span>
                  </div>

                  <strong>{selectedOption?.price}</strong>
                </div>

                {selectedEnhancementDetails.map((enhancement) => (
                  <div
                    className="retreat-booking-summary__enhancement"
                    key={enhancement.id}
                  >
                    <span>{enhancement.name}</span>
                    <strong>+{"\u00A3"}{enhancement.price}</strong>
                  </div>
                ))}

                <div className="retreat-booking-summary__total">
                  <span>Total</span>
                  <strong>
                    {"\u00A3"}{bookingTotal}
                  </strong>
                </div>
              </div>
<button
                onClick={bookTreatment}
                style={{
                  marginTop: "24px",
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "14px",
                  border: "1px solid #6f8f7a",
                  background: "#6f8f7a",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.3px",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "#5f7f6c"
                  event.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "#6f8f7a"
                  event.currentTarget.style.transform = "translateY(0)"
                }}
              >
                Request via WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Treatments

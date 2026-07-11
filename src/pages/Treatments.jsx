import "../styles/global.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const treatments = [
  {
    category: "Signature Experiences",
    name: "Neck, Head, and Face Massage",
    description: "Melt away tension and restore a natural glow with a calming massage for the neck, head, and face.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Signature Experiences",
    name: "Back, Neck, and Head with Hot Stone Massage",
    description: "Release tension and calm the mind with soothing hot stones.",
    prices: [{ time: "60 min", price: "£65" }],
  },
  {
    category: "Signature Experiences",
    name: "Full Body Massage (Lomi Lomi Inspired)",
    description: "Flowing, rhythmic movements designed to restore balance and relax the body.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Signature Experiences",
    name: "Full Body Hot Stone Massage",
    description: "Deep relaxation using heated stones to ease muscle tension.",
    prices: [{ time: "70 min", price: "£70" }],
  },
  {
    category: "Signature Experiences",
    name: "Nurturing Full Body Pregnancy Massage",
    description: "A soothing massage designed to support relaxation and wellbeing during pregnancy.",
    prices: [{ time: "70 min", price: "£60" }],
  },
  {
    category: "Specialist Recovery",
    name: "Therapeutic Deep Tissue Full Body Therapy",
    description: "Target deep muscle tension and restore balance. Best for stress and recovery.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Specialist Recovery",
    name: "Sports Massage Therapy",
    description: "Focused treatment to ease muscle tension and support recovery.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Specialist Recovery",
    name: "Myofascial Release Therapy",
    description: "Restorative treatment to release deep tension and improve mobility.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Specialist Recovery",
    name: "Race Day Reset",
    description: "Hot and cold therapy with targeted muscle work for recovery.",
    prices: [{ time: "70 min", price: "£70" }],
  },
  {
    category: "Signature Treatment",
    name: "Mourne Recovery Therapy",
    description: "A tailored blend of sports massage and myofascial release for full-body reset.",
    prices: [{ time: "90 min", price: "£80" }],
  },
  {
    category: "Signature Treatment",
    name: "Mourne Rocks Retreat & Recovery",
    description:
      "A restorative two-hour treatment designed to release muscular tension while nourishing the skin and promoting deep relaxation. This signature experience combines a back sports massage with hot stones to ease tightness and stiffness in the back, shoulders, and neck, together with a Nourishing & Therapeutic Facial using Neal's Yard Remedies Organic skincare. The facial includes a cleanse, exfoliation, nourishing mask, gentle facial lymphatic drainage, and therapeutic massage to the face, neck, shoulders, and scalp to help reduce puffiness, release tension, and restore a natural glow. Perfect for those seeking both therapeutic bodywork and a deeply relaxing facial experience in the tranquil surroundings of Retreat by the Mournes.",
    prices: [{ time: "2 hours", price: "£115" }],
  },
  {
    category: "Nurture & Restore",
    name: "Gentle Back, Neck, and Head Massage",
    description: "Gentle treatment to ease tension and restore calm.",
    prices: [{ time: "60 min", price: "£55" }],
  },
  {
    category: "Nurture & Restore",
    name: "Head & Neck Massage with Essential Oils",
    description: "Calming massage to relax the mind and support restful sleep.",
    prices: [{ time: "60 min", price: "£55" }],
  },
  {
    category: "Nurture & Restore",
    name: "Nourishing & Therapeutic Facial",
    description:
      "A deeply relaxing facial designed to nourish your skin while easing tension and promoting overall wellbeing. Using Neal's Yard Remedies Organic skincare, this treatment includes a cleanse, exfoliation, nourishing mask, gentle facial lymphatic drainage, and therapeutic massage to the face, neck, shoulders, and scalp. The extended neck, shoulder, and head massage helps to ease stiffness, release built-up tension, and encourage deep relaxation. Perfect for reducing puffiness, relieving stress, and leaving your skin feeling hydrated, refreshed, and naturally radiant.",
    prices: [{ time: "75 min", price: "£75" }],
  },
  {
    category: "Express Rituals",
    name: "Tension Release Back Therapy",
    description: "Quick treatment to relieve back, neck, and shoulder tension.",
    prices: [{ time: "30 min", price: "£30" }],
  },
  {
    category: "Express Rituals",
    name: "Revitalizing Head & Face Massage",
    description: "Relaxing treatment to ease tension and refresh your skin.",
    prices: [{ time: "30 min", price: "£30" }],
  },
  {
    category: "Express Rituals",
    name: "Grounding Foot Ritual",
    description: "Revives tired feet and restores comfort.",
    prices: [{ time: "30 min", price: "£30" }],
  },
  {
    category: "Express Rituals",
    name: "Grounding Hand Ritual",
    description: "Relieves tension in hands and wrists.",
    prices: [{ time: "30 min", price: "£30" }],
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

function Treatments() {
  const location = useLocation()
  const targetCategory = location.state?.targetCategory ?? null
  const defaultTreatment = targetCategory
    ? treatments.find((treatment) => treatment.category === targetCategory) ?? null
    : null
  const featuredTreatment = treatments.find((treatment) => treatment.name === "Mourne Rocks Retreat & Recovery")

  const [manualSelection, setManualSelection] = useState(null)
  const selectionMatchesCategory = manualSelection?.category === targetCategory
  const selectedTreatment = selectionMatchesCategory ? manualSelection.treatment : defaultTreatment
  const selectedOption = selectionMatchesCategory ? manualSelection.option : defaultTreatment?.prices[0] ?? null

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
      category: targetCategory,
      treatment,
      option: priceOption,
    })
  }

  const bookTreatment = () => {
    if (!selectedTreatment || !selectedOption) return

    const message = `Hi Beata, I'd like to book: ${selectedTreatment.name} (${selectedOption.time}) - ${selectedOption.price}.`
    window.open(`https://wa.me/447591383215?text=${encodeURIComponent(message)}`)
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
          gap: "40px",
          maxWidth: "1100px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {featuredTreatment && (
            <section
              style={{
                marginBottom: "18px",
                padding: "32px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, rgba(236, 232, 225, 0.75), rgba(255,255,255,0.95))",
                border: "1px solid rgba(198, 166, 100, 0.38)",
                boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
              }}
            >
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
                <span aria-hidden="true">☆</span>
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
                  {featuredTreatment.prices[0].time} • {featuredTreatment.prices[0].price}
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontFamily: "var(--font-heading)" }}>{treatment.name}</strong>
                      <span style={{ opacity: 0.4 }}>&rarr;</span>
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
          style={{
            position: "sticky",
            top: "100px",
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

              <div style={{ marginTop: "25px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                <p>
                  <strong>Selected:</strong>
                  <br />
                  {selectedOption?.time} - {selectedOption?.price}
                </p>
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
                Confirm & Book via WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Treatments

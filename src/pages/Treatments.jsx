import "../styles/global.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const treatments = [
  {
    category: "Signature Experiences",
    name: "Neck, Head, and Face Massage",
    description: "Melt away tension and restore a natural glow with a calming massage for the neck, head, and face.",
    prices: [
      { time: "60 min", price: "£50" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Signature Experiences",
    name: "Back, Neck, and Head with Hot Stone Massage",
    description: "Release tension and calm the mind with soothing hot stones.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Signature Experiences",
    name: "Full Body Massage (Lomi Lomi Inspired)",
    description: "Flowing, rhythmic movements designed to restore balance and relax the body.",
    prices: [
      { time: "60 min", price: "£50" },
      { time: "90 min", price: "£80" },
    ],
  },
  {
    category: "Signature Experiences",
    name: "Full Body Hot Stone Massage",
    description: "Deep relaxation using heated stones to ease muscle tension.",
    prices: [{ time: "70 min", price: "£65" }],
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
    category: "Nurture & Restore",
    name: "Gentle Back, Neck, and Head Massage",
    description: "Gentle treatment to ease tension and restore calm.",
    prices: [{ time: "60 min", price: "£50" }],
  },
  {
    category: "Nurture & Restore",
    name: "Head & Neck Massage with Essential Oils",
    description: "Calming massage to relax the mind and support restful sleep.",
    prices: [{ time: "60 min", price: "£50" }],
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

function Treatments() {
  const location = useLocation()
  const targetCategory = location.state?.targetCategory ?? null
  const defaultTreatment = targetCategory
    ? treatments.find((treatment) => treatment.category === targetCategory) ?? null
    : null

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

  const bookTreatment = () => {
    if (!selectedTreatment || !selectedOption) return

    const message = `Hi Beata, I'd like to book: ${selectedTreatment.name} (${selectedOption.time}) - ${selectedOption.price}.`
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
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          maxWidth: "1100px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
                    onClick={() => {
                      setManualSelection({
                        category: targetCategory,
                        treatment,
                        option: treatment.prices[0],
                      })
                    }}
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
                    onClick={() =>
                      setManualSelection({
                        category: targetCategory,
                        treatment: selectedTreatment,
                        option: priceOption,
                      })
                    }
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

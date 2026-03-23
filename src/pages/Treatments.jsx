import "../styles/global.css"
import { useState } from "react"

const treatments = [
  {
    name: "Ground & Glow",
    description: "Neck, head & face massage that melts away tension and restores a natural glow.",
    prices: [
      { time: "60 min", price: "£60" },
      { time: "90 min", price: "£80" }
    ]
  },
   {
    name: "Sacred Ease",
    description: "Gentle back, neck & head massage to ease tension and restore calm.",
    prices: [{ time: "60 min", price: "£60" },
      { time: "90 min", price: "£80" }
    ]
  },
    {
    name: "Sacred Heat Back Ritual",
    description: "Back, neck & head hot stone massage to release tension and calm the mind.",
    prices: [
      { time: "60 min", price: "£65" },
      { time: "90 min", price: "£85" }
    ]
  },
 
  {
    name: "Earthen Tide",
    description: "Full body massage with flowing, Lomi Lomi-inspired movements to restore balance.",
    prices: [
      { time: "60 min", price: "£60" },
      { time: "90 min", price: "£80" }
    ]
  },
  {
    name: "Sports Therapy Massage",
    description: "Targeted sports massage to ease tight muscles, improve movement, and aid recovery.",
    prices: [
      { time: "60 min", price: "£60" },
      { time: "90 min", price: "£80" }
    ]
  },
  {
    name: "Therapeutic Massage",
    description: "Deep full body therapy to release tension, ease aches, and restore balance.",
    prices: [
      { time: "60 min", price: "£65" },
      { time: "90 min", price: "£85" }
    ]
  },
  {
    name: "Race Day Reset",
    description: "Hot & cold sports recovery with targeted massage to reduce tension and support recovery.",
    prices: [
      { time: "60 min", price: "£65" },
      { time: "90 min", price: "£85" }
    ]
  },
  {
    name: "Earth Warmth Ritual",
    description: "Full body hot stone massage to melt tension and deeply relax the body.",
    prices: [
      { time: "60 min", price: "£60" },
      { time: "90 min", price: "£80" }
    ]
  },

  {
    name: "Blossom & Bump",
    description: "Nurturing pregnancy massage to support relaxation and wellbeing.",
    prices: [
      { time: "60 min", price: "£60" },
      { time: "90 min", price: "£80" }
    ]
  },
  {
    name: "Natural Lift Facial Ritual",
    description: "Facial treatment to boost circulation and enhance natural glow.",
    prices: [{ time: "30 min", price: "£30" }]
  },
  {
    name: "Tension Release Back Therapy",
    description: "Quick treatment to relieve tension in the back, neck, and shoulders.",
    prices: [{ time: "30 min", price: "£30" }]
  },
  {
    name: "Head Massage with Essential Oils",
    description: "Calming head massage to relax the mind and support restful sleep.",
    prices: [{ time: "30 min", price: "£28" }]
  },
  {
    name: "Grounding Foot Ritual",
    description: "Revives tired feet and restores comfort after long days or walks.",
    prices: [{ time: "30 min", price: "£25" }]
  },
  {
    name: "Grounding Hand Ritual",
    description: "Relieves tension in hands and wrists for improved comfort and ease.",
    prices: [{ time: "30 min", price: "£25" }]
  }
]

function Treatments() {

  const [selectedTreatment, setSelectedTreatment] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)

  const bookTreatment = () => {
    if (!selectedTreatment || !selectedOption) return

    const message = `Hi Beata, I’d like to book: ${selectedTreatment.name} (${selectedOption.time}) - ${selectedOption.price}.`

    window.open(
      `https://wa.me/447591383215?text=${encodeURIComponent(message)}`
    )
  }

  return (
    <section style={{
      padding: "100px 20px",
      background: "linear-gradient(to bottom, #f8f8f8, #ffffff)"
    }}>

      <h1 style={{
        textAlign: "center",
        fontFamily: "var(--font-heading)",
        marginBottom: "40px"
      }}>
        Book Your Treatment
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        maxWidth: "1100px",
        margin: "0 auto",
        alignItems: "start"
      }}>

        {/* LEFT SIDE */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>
          {treatments.map((t, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedTreatment(t)
                setSelectedOption(t.prices[0])
              }}
              style={{
  padding: "20px",
  borderRadius: "14px",
  background: selectedTreatment === t ? "#6f8f7a" : "#f5f5f5",
  color: selectedTreatment === t ? "#fff" : "#2a2a2a",
  cursor: "pointer",
  boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
  transition: "all 0.25s ease",
  transform: "translateY(0) scale(1)"
}}

           onMouseEnter={(e) => {
  if (selectedTreatment !== t) {
    e.currentTarget.style.transform = "translateY(-6px) scale(1.02)"
    e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.10)"
    e.currentTarget.style.background = "#eeeeee"
  }
}}

onMouseLeave={(e) => {
  if (selectedTreatment !== t) {
    e.currentTarget.style.transform = "translateY(0) scale(1)"
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.04)"
    e.currentTarget.style.background = "#f5f5f5"
  }
}}
            >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <strong style={{ fontFamily: "var(--font-heading)" }}>
    {t.name}
  </strong>
  <span style={{ opacity: 0.4 }}>→</span>
</div>

              <p style={{ fontSize: "12px", opacity: 0.6 }}>
                {t.prices[0]?.time} — {t.prices[0]?.price}
              </p>

              <p style={{ fontSize: "13px", opacity: 0.8 }}>
                {t.description}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div style={{
          position: "sticky",
          top: "100px",
          alignSelf: "start",
          padding: "30px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
        }}>

          {!selectedTreatment ? (
            <p style={{ color: "#777" }}>
              Select a treatment to begin booking
            </p>
          ) : (
            <>
              <h3 style={{ fontFamily: "var(--font-heading)" }}>
                {selectedTreatment.name}
              </h3>

              <p style={{ fontSize: "13px", color: "#666" }}>
                {selectedTreatment.description}
              </p>

              {/* OPTIONS */}
              <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap"
              }}>
                {selectedTreatment.prices.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(p)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "999px",
                      border: selectedOption === p
                        ? "1px solid #6f8f7a"
                        : "1px solid #d6d6d6",
                      background: selectedOption === p
                        ? "#6f8f7a"
                        : "#f7f7f7",
                      color: selectedOption === p ? "#fff" : "#333",
                      cursor: "pointer",
                      transition: "all 0.25s ease"
                    }}
                  >
                    {p.time} — {p.price}
                  </button>
                ))}
              </div>

              {/* SUMMARY */}
              <div style={{
                marginTop: "25px",
                paddingTop: "15px",
                borderTop: "1px solid #eee"
              }}>
                <p>
                  <strong>Selected:</strong><br />
                  {selectedOption?.time} — {selectedOption?.price}
                </p>
              </div>

              {/* BUTTON */}
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
                  transition: "all 0.25s ease"
                }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5f7f6c"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#6f8f7a"
                  e.currentTarget.style.transform = "translateY(0)"
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
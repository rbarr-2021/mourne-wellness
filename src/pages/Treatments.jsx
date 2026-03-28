import "../styles/global.css"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const treatments = [
  // Signature Experiences
  {
    category: "Signature Experiences",
    name: "Neck, Head, and Face Massage",
    description: "Melt away tension and restore a natural glow with a calming massage for the neck, head, and face.",
    prices: [
      { time: "60 min", price: "£50" },
      { time: "90 min", price: "£70" }
    ]
  },
  {
    category: "Signature Experiences",
    name: "Back, Neck, and Head with Hot Stone Massage",
    description: "Release tension and calm the mind with soothing hot stones.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£75" }
    ]
  },
  {
    category: "Signature Experiences",
    name: "Full Body Massage (Lomi Lomi Inspired)",
    description: "Flowing, rhythmic movements designed to restore balance and relax the body.",
    prices: [
      { time: "60 min", price: "£50" },
      { time: "90 min", price: "£70" }
    ]
  },
  {
    category: "Signature Experiences",
    name: "Full Body Hot Stone Massage",
    description: "Deep relaxation using heated stones to ease muscle tension.",
    prices: [
      { time: "70 min", price: "£65" }
    ]
  },
  {
    category: "Signature Experiences",
    name: "Nurturing Full Body Pregnancy Massage",
    description: "A soothing massage designed to support relaxation and wellbeing during pregnancy.",
    prices: [
      { time: "70 min", price: "£60" }
    ]
  },

  // Specialist Recovery
  {
    category: "Specialist Recovery",
    name: "Therapeutic Deep Tissue Full Body Therapy",
    description: "Target deep muscle tension and restore balance. Best for stress and recovery.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£75" }
    ]
  },
  {
    category: "Specialist Recovery",
    name: "Sports Massage Therapy",
    description: "Focused treatment to ease muscle tension and support recovery.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£75" }
    ]
  },
  {
    category: "Specialist Recovery",
    name: "Myofascial Release Therapy",
    description: "Restorative treatment to release deep tension and improve mobility.",
    prices: [
      { time: "60 min", price: "£55" },
      { time: "90 min", price: "£75" }
    ]
  },
  {
    category: "Specialist Recovery",
    name: "Race Day Reset",
    description: "Hot & cold therapy with targeted muscle work for recovery.",
    prices: [
      { time: "70 min", price: "£70" }
    ]
  },

  // Signature Treatment
  {
    category: "Signature Treatment",
    name: "Mourne Recovery Therapy",
    description: "A tailored blend of sports massage and myofascial release for full-body reset.",
    prices: [
      { time: "90 min", price: "£80" }
    ]
  },

  // Nurture & Restore
  {
    category: "Nurture & Restore",
    name: "Gentle Back, Neck, and Head Massage",
    description: "Gentle treatment to ease tension and restore calm.",
    prices: [
      { time: "60 min", price: "£50" }
    ]
  },
  {
    category: "Nurture & Restore",
    name: "Head & Neck Massage with Essential Oils",
    description: "Calming massage to relax the mind and support restful sleep.",
    prices: [
      { time: "60 min", price: "£50" }
    ]
  },

  // Express Rituals
  {
    category: "Express Rituals",
    name: "Tension Release Back Therapy",
    description: "Quick treatment to relieve back, neck, and shoulder tension.",
    prices: [
      { time: "30 min", price: "£30" }
    ]
  },
  {
    category: "Express Rituals",
    name: "Revitalizing Head & Face Massage",
    description: "Relaxing treatment to ease tension and refresh your skin.",
    prices: [
      { time: "30 min", price: "£30" }
    ]
  },
  {
    category: "Express Rituals",
    name: "Grounding Foot Ritual",
    description: "Revives tired feet and restores comfort.",
    prices: [
      { time: "30 min", price: "£30" }
    ]
  },
  {
    category: "Express Rituals",
    name: "Grounding Hand Ritual",
    description: "Relieves tension in hands and wrists.",
    prices: [
      { time: "30 min", price: "£30" }
    ]
  }
];

function Treatments() {
  const [selectedTreatment, setSelectedTreatment] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const location = useLocation()

  useEffect(() => {
  if (location.state?.targetCategory) {
    const element = document.getElementById(location.state.targetCategory)
    if (element) {
      // Get the element's top relative to the document
      const yOffset = -80  // Adjust this offset to stop exactly at the title
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }

    // Preselect first treatment in category
    const target = treatments.find(t => t.category === location.state.targetCategory)
    if (target) {
      setSelectedTreatment(target)
      setSelectedOption(target.prices[0])
    }
  }
}, [location.state])

  const bookTreatment = () => {
    if (!selectedTreatment || !selectedOption) return
    const message = `Hi Beata, I’d like to book: ${selectedTreatment.name} (${selectedOption.time}) - ${selectedOption.price}.`
    window.open(`https://wa.me/447591383215?text=${encodeURIComponent(message)}`)
  }

  const categories = ["Signature Experiences","Specialist Recovery","Signature Treatment","Nurture & Restore","Express Rituals"]

  return (
    <section style={{ padding: "100px 20px", background: "linear-gradient(to bottom, #f8f8f8, #ffffff)" }}>
      <h1 style={{ textAlign: "center", fontFamily: "var(--font-heading)", marginBottom: "40px" }}>
        Book Your Treatment
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", maxWidth: "1100px", margin: "0 auto", alignItems: "start" }}>

        {/* LEFT SIDE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {categories.map(category => (
            <div key={category}>
              {/* Category Heading */}
              <h2 id={category} style={{ margin: "20px 0 10px", fontFamily: "var(--font-heading)" }}>
                {category}
              </h2>

              {/* Treatments in this category */}
              {treatments.filter(t => t.category === category).map((t, i) => (
                <div
                  key={i}
                  id={t.name}
                  onClick={() => { setSelectedTreatment(t); setSelectedOption(t.prices[0]) }}
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
                    <strong style={{ fontFamily: "var(--font-heading)" }}>{t.name}</strong>
                    <span style={{ opacity: 0.4 }}>→</span>
                  </div>
                  <p style={{ fontSize: "12px", opacity: 0.6 }}>
                    {t.prices[0]?.time} — {t.prices[0]?.price}
                  </p>
                  <p style={{ fontSize: "13px", opacity: 0.8 }}>{t.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Booking Panel */}
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
            <p style={{ color: "#777" }}>Select a treatment to begin booking</p>
          ) : (
            <>
              <h3 style={{ fontFamily: "var(--font-heading)" }}>{selectedTreatment.name}</h3>
              <p style={{ fontSize: "13px", color: "#666" }}>{selectedTreatment.description}</p>

              {/* OPTIONS */}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                {selectedTreatment.prices.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(p)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "999px",
                      border: selectedOption === p ? "1px solid #6f8f7a" : "1px solid #d6d6d6",
                      background: selectedOption === p ? "#6f8f7a" : "#f7f7f7",
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
              <div style={{ marginTop: "25px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                <p><strong>Selected:</strong><br />{selectedOption?.time} — {selectedOption?.price}</p>
              </div>

              {/* BOOK BUTTON */}
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
                onMouseEnter={(e) => { e.currentTarget.style.background = "#5f7f6c"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#6f8f7a"; e.currentTarget.style.transform = "translateY(0)" }}
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
import "../styles/global.css"

const treatments = [
  {
    name: "Massage Therapy",
    description: "Relaxing full body massage inspired by the Mourne Mountains.",
    prices: [
      { time: "60 minutes", price: "£90" },
      { time: "90 minutes", price: "£120" }
    ]
  },
  {
    name: "Holistic Healing",
    description: "Energy healing designed to restore balance.",
    prices: [{ time: "60 minutes", price: "£85" }]
  },
  {
    name: "Reiki Session",
    description: "Gentle energy therapy promoting deep relaxation.",
    prices: [{ time: "60 minutes", price: "£80" }]
  },
  {
    name: "Deep Tissue Massage",
    description: "Therapeutic massage to relieve tension and muscle stress.",
    prices: [
      { time: "60 minutes", price: "£95" },
      { time: "90 minutes", price: "£125" }
    ]
  },
  {
    name: "Hot Stone Massage",
    description: "Warm stones relax muscles and improve circulation.",
    prices: [{ time: "75 minutes", price: "£110" }]
  },
  {
    name: "Mindfulness Coaching",
    description: "Guided mindfulness and breathing sessions.",
    prices: [{ time: "60 minutes", price: "£75" }]
  },
  {
    name: "Energy Balance Session",
    description: "Restore harmony through gentle energy techniques.",
    prices: [{ time: "60 minutes", price: "£85" }]
  },
  {
    name: "Relaxation Ritual",
    description: "A calming combination of massage and mindfulness.",
    prices: [{ time: "90 minutes", price: "£135" }]
  },
    {
    name: "Ritual",
    description: "A calming combination of massage and mindfulness.",
    prices: [{ time: "90 minutes", price: "£135" }]
  }
]

function Treatments() {

  const bookTreatment = (name) => {
    const message = `Hello, I would like to book the ${name} treatment at Retreat By the Mournes.`
    window.open(`https://wa.me/447591383215?text=${encodeURIComponent(message)}`)
  }

  const cardStyle = {
    background: "var(--bg-card)",
    padding: "35px",
    borderRadius: "14px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    textAlign: "left"
  }

  return (
    <section style={{
      padding: "var(--section-padding)",
      background: "var(--bg-main)",
      textAlign: "center"
    }}>

      <h1 style={{
        fontSize: "clamp(28px,4vw,40px)",
        marginBottom: "20px",
        fontFamily: "var(--font-heading)"
      }}>
        Treatments & Pricing
      </h1>

      <p style={{
        color: "var(--text-light)",
        maxWidth: "600px",
        margin: "0 auto 50px",
        fontFamily: "var(--font-body)"
      }}>
        Relax, restore and reconnect with our carefully designed
        wellness treatments at Retreat By the Mournes.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
        gap: "30px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>

        {treatments.map((treatment, index) => (

          <div
            key={index}
            style={cardStyle}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)"
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.12)"
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.05)"
            }}
          >

            <h3 style={{
              fontSize: "clamp(18px,2vw,22px)",
              fontFamily: "var(--font-heading)",
              marginBottom: "10px"
            }}>
              {treatment.name}
            </h3>

            <p style={{
              color: "var(--text-light)",
              fontSize: "14px",
              fontFamily: "var(--font-body)"
            }}>
              {treatment.description}
            </p>

            <div style={{
              marginTop: "18px",
              borderTop: "1px solid #eee",
              paddingTop: "12px"
            }}>

              {treatment.prices.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    fontFamily: "var(--font-body)"
                  }}
                >
                  <span>{p.time}</span>
                  <span>{p.price}</span>
                </div>
              ))}

            </div>

            <button
              onClick={() => bookTreatment(treatment.name)}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                border: "none",
                background: "var(--primary)",
                color: "white",
                borderRadius: "30px",
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}

              onMouseEnter={(e)=>{
                e.currentTarget.style.background="var(--primary-dark)"
                e.currentTarget.style.transform="translateY(-2px)"
              }}

              onMouseLeave={(e)=>{
                e.currentTarget.style.background="var(--primary)"
                e.currentTarget.style.transform="translateY(0)"
              }}
            >
              Book Session
            </button>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Treatments
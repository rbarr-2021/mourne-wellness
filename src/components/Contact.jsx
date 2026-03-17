import "../styles/global.css"
import mapImg from "../assets/location2.PNG" // use a high-quality static image of your retreat location

function Contact() {
  const bookWhatsApp = () => {
    const message = "Hello, I would like to book a session at Retreat By the Mournes."
    window.open(`https://wa.me/447591383215?text=${encodeURIComponent(message)}`)
  }

  return (
    <section id="contact" style={{
      padding: "var(--section-padding)",
      background: "var(--bg-main)",
      textAlign: "center",
      position: "relative"
    }}>
      
      {/* Heading */}
      <h2 style={{
        fontSize: "clamp(24px,3vw,32px)",
        marginBottom: "25px",
        fontFamily: "var(--font-heading)",
        color: "var(--text-dark)"
      }}>
        Contact / Book a Session
      </h2>

      {/* Contact Info */}
      <p style={{ color: "var(--text-light)", margin: "5px 0" }}>
        Email: info@mournewellness.com
      </p>
      <p style={{ color: "var(--text-light)", margin: "5px 0" }}>
        Phone: 07591 383215
      </p>

      {/* Book via WhatsApp Button */}
      <button
        onClick={bookWhatsApp}
        style={{
          padding: "14px 32px",
          marginTop: "20px",
          background: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: "30px",
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          letterSpacing: "1px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "var(--primary-dark)"
          e.currentTarget.style.transform = "translateY(-2px)"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "var(--primary)"
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        Book via WhatsApp
      </button>

      {/* Optional Static Map / Location */}
      <div style={{
        marginTop: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px"
      }}>
        {/* Static map image */}
        <img 
          src={mapImg} 
          alt="Retreat Location" 
          style={{
            width: "280px",
            maxWidth: "90%",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)"
          }}
        />

        {/* Elegant View Location Link */}
        <a href="https://maps.app.goo.gl/7unDaWEhynQcMBWE7" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--primary)",
            textDecoration: "none",
            fontWeight: "500",
            letterSpacing: "0.5px"
          }}>
          📍 View Our Location
        </a>
      </div>

    </section>
  )
}

export default Contact
import "../styles/global.css"
import mapImg from "../assets/location2.PNG" // use a high-quality static image of your retreat location
import { Link } from "react-router-dom"

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
        Contact / Begin Your Retreat
      </h2>
{/* Opening Hours */}
<div style={{
  marginTop: "30px",
  fontFamily: "var(--font-body)",
  color: "var(--text-light)"
}}>
  <h3 style={{
    fontSize: "clamp(18px,2.5vw,22px)",
    marginBottom: "10px",
    color: "var(--text-dark)",
    fontFamily: "var(--font-heading)"
  }}>
    Opening Hours
  </h3>

  <p style={{ margin: "4px 0" }}>Monday – Friday: 9:00 AM – 7:00 PM</p>
   <p style={{ margin: "4px 0" }}>Thursday: 9:00 AM – 8:00 PM</p>
  <p style={{ margin: "4px 0" }}>Saturday: 8:30 AM – 4:00 PM</p>
  <p style={{ margin: "4px 0" }}>Sunday: Closed</p>

  <p style={{
    marginTop: "8px",
    fontSize: "13px",
    opacity: "0.8"
  }}>
    * By appointment only
  </p>
</div>
      {/* Contact Info */}
    <p style={{ color: "var(--text-light)", margin: "5px 0" }}>
  Email:{" "}
  <a href="mailto:beata@mourneretreat.co.uk?subject=Booking%20Enquiry&body=Hi%20Beata,%20I%20would%20like%20to%20book...">
    beata@mourneretreat.co.uk
  </a>
</p>
  <p style={{ color: "var(--text-light)", margin: "5px 0" }}>
  Phone:{" "}
  <a href="tel:+447591383215">
    +447591 383215
  </a>
  
</p>

      {/* Book via WhatsApp Button */}
<Link
  to="/treatments"
  style={{
    padding: "14px 32px",
    background: "var(--primary)",
    color: "white",
    borderRadius: "30px",
    textDecoration: "none",
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    display: "inline-block"
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
  Begin Your Retreat
</Link>

      

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
        <a> 8 Church Hill, Newcastle, BT33 0JU </a>
      </div>

    </section>
  )
}

export default Contact
import { Link } from "react-router-dom"
import { FaSpa } from "react-icons/fa"
import { GiHealing } from "react-icons/gi"
import { MdSelfImprovement } from "react-icons/md"
import "../styles/global.css"

function Services() {

  const cardStyle = {
    maxWidth: "220px",
    width: "100%",
    padding: "25px",
    background: "var(--bg-card)",
    borderRadius: "12px",
    textAlign: "center",
    textDecoration: "none",
    color: "var(--text-dark)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
  }

  const iconStyle = {
    color: "var(--primary)",
    marginBottom: "12px"
  }

  return (
    <section id="services" style={{
      padding: "var(--section-padding)",
      background: "var(--bg-main)",
      textAlign: "center"
    }}>
      
      <h2 style={{
        fontSize: "clamp(24px,3vw,32px)",
        fontFamily: "var(--font-heading)",
        marginBottom: "10px"
      }}>
        Retreat By The Mournes
      </h2>

      <p style={{
        color: "var(--text-light)",
        maxWidth: "500px",
        margin: "0 auto 40px",
        fontFamily: "var(--font-body)"
      }}>Wellness & Sports Therapy | 
Restore balance | Reconnect with nature | Return to yourself

      </p>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap"
      }}>

        <Link
          to="/treatments"
          style={cardStyle}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="translateY(-6px)"
            e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.1)"
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="translateY(0)"
            e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.05)"
          }}
        >
          <FaSpa size={40} style={iconStyle} />
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(18px,2vw,22px)"
          }}>
            Signature Experiences 
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
            A collection of bespoke treatments designed to deeply relax the body, release built-up tension, and restore your natural balance. Perfect for those seeking a holistic, rejuvenating experience that addresses both body and mind.
          </p>
        </Link>

        <Link
          to="/treatments"
          style={cardStyle}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="translateY(-6px)"
            e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.1)"
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="translateY(0)"
            e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.05)"
          }}
        >
          <GiHealing size={40} style={iconStyle} />
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(18px,2vw,22px)"
          }}>
            Specialist Recovery
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
Focused treatments to accelerate recovery, relieve muscle tension, and support the body’s natural healing. Using advanced techniques like hot/cold therapy, deep tissue massage, and hot stone rituals, these sessions are designed for those who need targeted relief and restoration.          </p>
        </Link>

        <Link
          to="/treatments"
          style={cardStyle}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="translateY(-6px)"
            e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.1)"
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="translateY(0)"
            e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.05)"
          }}
        >
          <MdSelfImprovement size={40} style={iconStyle} />
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(18px,2vw,22px)"
          }}>
        Signature Treatment 
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
Mourne Recovery Therapy — A tailored blend of sports massage and myofascial release, combining deep muscle work with gentle, grounding techniques to restore, rebalance, and recover.          </p>
        </Link>
    <Link
          to="/treatments"
          style={cardStyle}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="translateY(-6px)"
            e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.1)"
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="translateY(0)"
            e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.05)"
          }}
        >
          <FaSpa size={40} style={iconStyle} />
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(18px,2vw,22px)"
          }}>
            Express Rituals — 30 Minutes
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
            Short, focused treatments designed to quickly relieve tension, refresh the body, and restore calm—perfect for relaxation and a quick reset.
          </p>
        </Link>
      </div>

    </section>
  )
}

export default Services
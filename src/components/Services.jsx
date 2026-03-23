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
            A range of restorative treatments to relax the body, release tension, and restore balance—whether 
            you need deep muscle relief, targeted sports work, or gentle relaxation.
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
            Specialist treatments focused on recovery and deep relaxation, using techniques like hot and cold therapy and hot stone massage to ease muscle tension, reduce stress, and support the body’s natural healing and recovery.
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
          <MdSelfImprovement size={40} style={iconStyle} />
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(18px,2vw,22px)"
          }}>
           Nurture & Restore
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
            Gentle, nurturing treatments designed to support relaxation and wellbeing, helping to ease tension, calm the mind, and restore a sense of balance and comfort.
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
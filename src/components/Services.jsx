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
        Our Services
      </h2>

      <p style={{
        color: "var(--text-light)",
        maxWidth: "500px",
        margin: "0 auto 40px",
        fontFamily: "var(--font-body)"
      }}>
        Discover treatments designed to restore balance, calm the mind and renew your body.
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
            Massage Therapy
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
            Relaxing treatments to ease tension and stress.
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
            Holistic Healing
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
            Restore balance to mind and body.
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
            Wellness Sessions
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-light)",
            fontSize: "14px"
          }}>
            Personal sessions designed for your wellbeing.
          </p>
        </Link>

      </div>

    </section>
  )
}

export default Services
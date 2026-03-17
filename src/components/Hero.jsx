import heroImg from "../assets/wellness-hero.jpg"
import logo from "../assets/logo.jpg" // import your brand logo
import "../styles/global.css"

function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
      }}
    >

      {/* 🌿 Overlay for luxury feel */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.35)"
      }} />

      {/* 🌿 Logo top-left */}
      <img
        src={logo}
        alt="Retreat By the Mournes"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          height: "50px",
          objectFit: "contain",
          zIndex: 2
        }}
      />

      {/* 🌿 Main Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "0 20px",
        maxWidth: "900px"
      }}>
        <h1 style={{
          fontSize: "clamp(32px,5vw,52px)",
          fontFamily: "var(--font-heading)",
          marginBottom: "15px",
          lineHeight: "1.2"
        }}>
          Relax. Recover. Rebalance.
        </h1>

        <p style={{
          fontSize: "clamp(16px,2vw,20px)",
          fontFamily: "var(--font-body)",
          color: "#f0f0f0",
          marginBottom: "30px"
        }}>
          Holistic therapy to restore balance and wellbeing.
        </p>

        {/* 🌿 Optional CTA button for premium feel */}
        <a
          href="#contact"
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
          Book a Session
        </a>
      </div>

    </section>
  )
}

export default Hero
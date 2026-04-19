import { FaSpa } from "react-icons/fa"
import { GiHealing } from "react-icons/gi"
import { MdSelfImprovement } from "react-icons/md"
import "../styles/global.css"
import hero from "../assets/hero.jpg"
import profile from "../assets/profile.jpeg"
import { Link } from "react-router-dom"

function About() {
  const cardStyle = {
    maxWidth: "260px",
    width: "100%",
    padding: "25px",
    background: "var(--bg-card)",
    borderRadius: "12px",
    textAlign: "center",
    color: "var(--text-dark)",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "280px",
  }

  const iconStyle = {
    color: "var(--primary)",
    marginBottom: "12px",
  }

  const hoverHandlers = {
    onMouseEnter: (event) => {
      event.currentTarget.style.transform = "translateY(-6px)"
      event.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)"
    },
    onMouseLeave: (event) => {
      event.currentTarget.style.transform = "translateY(0)"
      event.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.05)"
    },
  }

  return (
    <div style={{ background: "var(--bg-main)", paddingTop: "100px" }}>
      <div style={{ width: "100%", height: "500px", overflow: "hidden" }}>
        <img
          src={hero}
          alt="Mourne landscape"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "40px auto",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          About Beata & Retreat by the Mournes
        </h1>

        <p style={{ color: "var(--text-light)", marginBottom: "10px" }}>
Philosophy
Inspired by the mountains and the sea, my work is centred on balance, flow, and deep restoration. I create a calm, considered space where body and mind can reset and reconnect — a place to step away, slow down, and be cared for.
Your Experience
Each treatment is thoughtfully tailored, blending over 20 years of clinical experience with a deeply intuitive, calming touch.
Sessions are designed not only to relieve pain and tension, but to restore ease, lightness, and a sense of quiet strength within the body — supporting both how you feel in the moment and how you move through daily life.
For You If…
You’re seeking more than just a treatment — you’re ready to feel like yourself again.
Whether you’re holding physical tension, recovering from strain or injury, or feeling the effects of long hours and postural stress, each session is designed to support your body with care and precision.
You may be navigating hormonal change, pregnancy, fatigue, or poor sleep — or simply feeling the impact of a full, fast-paced life. You might be in need of deep relaxation, stress relief, or regular time to reset and restore.
Wherever you are, treatments are tailored to meet you there — helping you feel lighter, calmer, and more at ease in your body.
Background
With over 20 years’ experience in holistic and sports therapy, my approach is shaped by both knowledge and lived experience.
Raised in the Polish mountains and now based in County Down, nature continues to influence the way I work — steady, flowing, and deeply restorative. This connection is at the heart of every treatment I offer.
        </p>

        <p style={{ color: "var(--text-light)" }}>
   
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 20px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "360px",
            padding: "14px",
            background: "rgba(255,255,255,0.7)",
            borderRadius: "24px",
            boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <img
            src={profile}
            alt="Portrait of Beata"
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "4 / 5",
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "18px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "30px",
          flexWrap: "wrap",
          padding: "40px 20px",
        }}
      >
        <div style={cardStyle} {...hoverHandlers}>
          <FaSpa size={40} style={iconStyle} />
          <h3 style={{ fontFamily: "var(--font-heading)", marginBottom: "10px" }}>My Story - About Beata</h3>
          <p style={{ fontSize: "14px", color: "var(--text-light)" }}>
            My journey into holistic therapy began over 20 years ago, driven by a passion for helping people feel
            better in both body and mind. Over the years, I've worked with a wide range of clients, continually
            developing my skills and refining my approach.
          </p>
        </div>

        <div style={cardStyle} {...hoverHandlers}>
          <GiHealing size={40} style={iconStyle} />
          <h3 style={{ fontFamily: "var(--font-heading)", marginBottom: "10px" }}>My Approach</h3>
          <p style={{ fontSize: "14px", color: "var(--text-light)" }}>
            Every session is guided by listening and understanding, creating a treatment that feels completely tailored
            to you.
          </p>
        </div>

        <Link to="/treatments" style={{ textDecoration: "none", display: "flex" }}>
          <div style={cardStyle} {...hoverHandlers}>
            <MdSelfImprovement size={40} style={iconStyle} />

            <h3
              style={{
                fontFamily: "var(--font-heading)",
                marginBottom: "10px",
              }}
            >
              Begin Your Retreat
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: "var(--text-light)",
              }}
            >
              Take time for yourself and experience a moment of calm in the Mournes.
            </p>

            <div
              style={{
                marginTop: "auto",
                padding: "10px 20px",
                background: "var(--primary)",
                color: "white",
                borderRadius: "25px",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
              }}
            >
              Book Now
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default About

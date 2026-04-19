import { useState, useEffect } from "react"
import { FaHome, FaSpa, FaFacebook, FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const closeMenuOnScroll = () => {
      setMenuOpen(false)
    }

    window.addEventListener("scroll", closeMenuOnScroll)
    return () => window.removeEventListener("scroll", closeMenuOnScroll)
  }, [])

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        width: "100%",
        boxSizing: "border-box",
        padding: scrolled ? "15px 40px" : "25px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(255,255,255,0.95)"
          : "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0))",
        backdropFilter: "blur(10px)",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s ease",
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          src={logo}
          alt="Retreat By the Mournes"
          style={{
            height: scrolled ? "35px" : "45px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
          }}
        />
        <div>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "3px",
              fontFamily: "var(--font-heading)",
              color: "var(--text-dark)",
            }}
          >
            RETREAT
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "var(--text-dark)",
              fontStyle: "italic",
              fontFamily: "var(--font-body)",
            }}
          >
            by the Mournes
          </div>
        </div>
      </Link>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          width: scrolled ? "48px" : "54px",
          height: scrolled ? "48px" : "54px",
          borderRadius: "999px",
          background: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.72)",
          border: "1px solid rgba(198, 166, 100, 0.28)",
          boxShadow: scrolled ? "0 8px 22px rgba(0,0,0,0.08)" : "0 10px 30px rgba(0,0,0,0.06)",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "translateY(-1px)"
          event.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)"
          event.currentTarget.style.borderColor = "rgba(198, 166, 100, 0.45)"
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "translateY(0)"
          event.currentTarget.style.boxShadow = scrolled ? "0 8px 22px rgba(0,0,0,0.08)" : "0 10px 30px rgba(0,0,0,0.06)"
          event.currentTarget.style.borderColor = "rgba(198, 166, 100, 0.28)"
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <HiOutlineAdjustmentsHorizontal size={24} color="var(--text-dark)" />
      </div>

      {menuOpen && (
        <div className="dropdown">
          <Link to="/" className="menu-item" onClick={() => setMenuOpen(false)}>
            <FaHome /> Home
          </Link>

          <Link to="/treatments" className="menu-item" onClick={() => setMenuOpen(false)}>
            <FaSpa /> Services
          </Link>

          <a href="https://wa.me/447591383215" className="menu-item" onClick={() => setMenuOpen(false)}>
            <FaWhatsapp color="#25D366" /> Contact
          </a>

          <Link to="/about" className="menu-item" onClick={() => setMenuOpen(false)}>
            <FaUser /> About
          </Link>

          <hr />

          <a
            href="https://www.instagram.com/p/DWveVvPiNCq/"
            className="menu-item"
            onClick={() => setMenuOpen(false)}
          >
            <FaInstagram color="#c13584" /> Instagram
          </a>

          <a
            href="https://www.facebook.com/people/Holistic-Sports-Therapy-by-Beata/61581068248993/"
            className="menu-item"
            onClick={() => setMenuOpen(false)}
          >
            <FaFacebook color="#1877f2" /> Facebook
          </a>

          <a href="https://wa.me/447591383215" className="menu-item" onClick={() => setMenuOpen(false)}>
            <FaWhatsapp color="#25D366" /> WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar

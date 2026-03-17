import { useState, useEffect } from "react"
import { FaHome, FaSpa, FaEnvelope, FaFacebook, FaWhatsapp, FaBars } from "react-icons/fa"
import { Link } from "react-router-dom"
import logo from "../assets/logo.jpg"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
<nav style={{
  position: "fixed",
  top: 0,
  width: "100%",
  padding: scrolled ? "15px 40px" : "25px 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  background: scrolled 
    ? "rgba(255,255,255,0.95)" 
    : "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0))",

  backdropFilter: "blur(10px)",
  boxShadow: scrolled 
    ? "0 4px 20px rgba(0,0,0,0.08)" 
    : "none",

  transition: "all 0.4s ease",
  zIndex: 1000
}}>
      
 {/* Left - Brand */}
<Link 
  to="/" 
  style={{ 
    display: "flex", 
    alignItems: "center", 
    gap: "10px",
    textDecoration: "none",   // 🔥 removes underline
    color: "inherit"          // 🔥 keeps your brand colours
  }}
>
<img 
  src={logo}
  alt="Retreat By the Mournes"
  style={{
    height: scrolled ? "35px" : "45px",
    transition: "all 0.3s ease"
  }}
/>
  <div>
    <div style={{ 
      fontSize: "22px", 
      letterSpacing: "3px", 
      fontFamily: "var(--font-heading)", 
      color: "var(--text-dark)" 
    }}>
      RETREAT
    </div>

    <div style={{ 
      fontSize: "13px", 
      color: "var(--primary)", 
      fontStyle: "italic", 
      fontFamily: "var(--font-body)" 
    }}>
      by the Mournes
    </div>
  </div>
</Link>

      {/* Center - Icons */}
      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "25px",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <Link to="/"><FaHome size={22} /></Link>
        <Link to="/treatments"><FaSpa size={22} /></Link>
        <a href="#contact"><FaEnvelope size={22} /></a>
        <a href="https://facebook.com"><FaFacebook size={22} color="#1877f2" /></a>
        <a href="https://wa.me/447591383215"><FaWhatsapp size={22} color="#25D366" /></a>
      </div>

      {/* Right - Mobile Menu */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FaBars size={24} style={{ cursor: "pointer" }} onClick={() => setMenuOpen(!menuOpen)} />
      </div>

    </nav>
  )
}

export default Navbar
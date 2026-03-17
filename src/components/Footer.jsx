import { FaFacebook, FaWhatsapp } from "react-icons/fa"
import logo from "../assets/logo.jpg"
import "../styles/global.css"

function Footer() {
  return (
    <footer style={{
      background: "var(--bg-card)",
      padding: "30px 20px",
      textAlign: "center",
      borderTop: `1px solid var(--accent)`
    }}>
      
      {/* Logo */}
      <img 
        src={logo} 
        alt="Retreat By the Mournes" 
        style={{ height: "40px", marginBottom: "10px", objectFit: "contain" }} 
      />

      {/* Brand Name */}
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "16px", color: "var(--text-dark)", letterSpacing: "1px" }}>
        RETREAT
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--primary)", fontStyle: "italic", marginBottom: "10px" }}>
        by the Mournes
      </div>

      {/* Contact Info */}
      <p style={{ color: "var(--text-light)", margin: "3px 0", fontSize: "13px" }}>
        info@mournewellness.com | 07591 383215
      </p>

      {/* Social Links */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "8px" }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={20} color="#1877f2"/>
        </a>
        <a href="https://wa.me/447591383215" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={20} color="#25D366"/>
        </a>
      </div>

      {/* Copyright */}
      <p style={{ color: "var(--text-light)", marginTop: "15px", fontSize: "11px" }}>
        © {new Date().getFullYear()} Retreat By the Mournes. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
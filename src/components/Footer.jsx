import { FaFacebook, FaWhatsapp } from "react-icons/fa"
import logo from "../assets/logo.png"
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
  style={{ 
    height: "40px", 
    marginBottom: "6px", // slightly less
    borderRadius: "20px"
  }} 
/>

<div style={{ fontSize: "15px", marginBottom: "2px" }}>
  <strong>RETREAT</strong>
</div>
<div style={{ fontSize: "12px", marginBottom: "10px", opacity: 0.8 }}>
  by the Mournes
</div>

          {/* Contact Info */}
  <div style={{ color: "var(--text-light)", fontSize: "14px" }}>
  <p style={{ margin: "4px 0" }}>
    Email: <a href="mailto:beata@mourneretreat.co.uk">beata@mourneretreat.co.uk</a>
  </p>
  <p style={{ margin: "4px 0" }}>
    Phone: <a href="tel:+447591383215">+447591 383215</a>
  </p>
</div>

  {/* Social Links */}
<div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "8px" }}>
          <a
            href="https://www.facebook.com/people/Holistic-Sports-Therapy-by-Beata/61581068248993/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={20} color="#1877f2"/>
          </a>
  <a href="https://wa.me/447591383215" target="_blank" rel="noopener noreferrer">
    <FaWhatsapp size={20} color="#25D366"/>
  </a>
</div>

{/* Company Info */}
<div style={{ marginTop: "10px", fontSize: "12px", opacity: 0.7 }}>
 
  <a 
    href="https://yourwebsite.com" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ color: "inherit", textDecoration: "underline" }}
  >
    
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

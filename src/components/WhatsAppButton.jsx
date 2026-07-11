import "./WhatsAppButton.css"
import { FaWhatsapp } from "react-icons/fa"
import { useLocation } from "react-router-dom"

function WhatsAppButton() {
  const location = useLocation()

  if (location.pathname === "/treatments") {
    return null
  }

  return (
    <a
      href="https://wa.me/447591383215"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  )
}

export default WhatsAppButton

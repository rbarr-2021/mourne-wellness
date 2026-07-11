import "./WhatsAppButton.css"
import { FaWhatsapp } from "react-icons/fa"

function WhatsAppButton() {
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

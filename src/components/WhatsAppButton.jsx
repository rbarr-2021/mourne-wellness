import "./WhatsAppButton.css"
import { FaWhatsapp } from "react-icons/fa"

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/447591383215"
      target="_blank"
      className="whatsapp-button"
    >
      <FaWhatsapp />
    </a>
  )
}

export default WhatsAppButton
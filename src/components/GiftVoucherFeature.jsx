import { Link } from "react-router-dom"
import giftImage from "../assets/retreat/web/DSC_9668.jpg"
import "../styles/gift-vouchers.css"

function GiftVoucherFeature() {
  return (
    <section className="gift-feature" aria-labelledby="gift-feature-title">
      <div className="gift-feature__image">
        <img
          src={giftImage}
          alt="A restorative treatment experience at Retreat by the Mournes"
          loading="lazy"
        />
      </div>

      <div className="gift-feature__content">
        <span className="gift-eyebrow">Gift Vouchers</span>

        <h2 id="gift-feature-title">A little time, thoughtfully given.</h2>

        <p>
          Give someone a restorative experience at Retreat by the Mournes.
          Personalised, delivered digitally and ready to enjoy when the time is right.
        </p>

        <Link to="/gift-vouchers" className="gift-text-link">
          Explore Gift Vouchers <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default GiftVoucherFeature
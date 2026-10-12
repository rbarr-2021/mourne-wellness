import Seo from "../components/Seo"
import giftImage from "../assets/retreat/web/DSC_9734.jpg"
import retreatImage from "../assets/retreat/web/DSC_9659.jpg"
import { SQUARE_EGIFT_URL } from "../lib/giftCards"
import "../styles/gift-vouchers.css"

const giftOptions = [
  {
    eyebrow: "The Signature Gift",
    title: "Mourne Rocks Retreat & Recovery",
    value: "Suggested gift value £115",
    description:
      "Our signature two-hour restorative experience, combining therapeutic bodywork, hot stones and a nourishing facial.",
  },
  {
    eyebrow: "Their Choice",
    title: "A Treatment at Retreat by the Mournes",
    value: "Choose a value to suit",
    description:
      "A thoughtful way to let them choose the treatment that feels right for them, from massage and recovery therapy to restorative facial care.",
  },
  {
    eyebrow: "Flexible Gifting",
    title: "A Gift Amount of Your Choice",
    value: "You choose the amount",
    description:
      "Perfect for birthdays, thank-yous, anniversaries, Christmas or simply giving someone some time for themselves.",
  },
]

function GiftVouchers() {
  return (
    <>
      <Seo
        title="Gift Vouchers | Retreat by the Mournes"
        description="Give the gift of restorative treatment at Retreat by the Mournes in Newcastle, County Down. Digital gift vouchers are available securely online."
        path="/gift-vouchers"
      />

      <main className="gift-page">
        <section className="gift-hero">
          <div className="gift-hero__image">
            <img
              src={giftImage}
              alt="Restorative care at Retreat by the Mournes"
            />
          </div>

          <div className="gift-hero__overlay" />

          <div className="gift-hero__content">
            <span className="gift-eyebrow gift-eyebrow--light">Gift Vouchers</span>
            <h1>Give the gift of retreat.</h1>
            <p>
              Time to slow down. Time to restore. A thoughtful experience,
              chosen with care.
            </p>

            <a className="gift-primary-button" href={SQUARE_EGIFT_URL}>
              Buy a Gift Voucher
            </a>

            <span className="gift-secure-note">
              Secure checkout powered by Square
            </span>
          </div>
        </section>

        <section className="gift-intro">
          <span className="gift-eyebrow">Something genuinely thoughtful</span>

          <h2>More than a voucher.</h2>

          <p>
            A Retreat by the Mournes gift voucher gives someone permission to
            stop, reset and enjoy treatment that is completely their own.
            Choose a value, add a personal message and Square will deliver the
            digital gift card directly by email.
          </p>
        </section>

        <section className="gift-options" aria-label="Gift voucher options">
          {giftOptions.map((option, index) => (
            <article
              className={`gift-option${index === 0 ? " gift-option--signature" : ""}`}
              key={option.title}
            >
              <span className="gift-option__eyebrow">{option.eyebrow}</span>

              <h2>{option.title}</h2>

              <p className="gift-option__value">{option.value}</p>

              <p className="gift-option__description">{option.description}</p>

              <a href={SQUARE_EGIFT_URL} className="gift-option__link">
                Choose this gift <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </section>

        <section className="gift-story">
          <div className="gift-story__image">
            <img
              src={retreatImage}
              alt="Personalised hands-on treatment at Retreat by the Mournes"
              loading="lazy"
            />
          </div>

          <div className="gift-story__content">
            <span className="gift-eyebrow">How it works</span>

            <h2>Beautifully simple.</h2>

            <div className="gift-steps">
              <div>
                <span>01</span>
                <p>Choose the gift value.</p>
              </div>

              <div>
                <span>02</span>
                <p>Add the recipient and your personal message.</p>
              </div>

              <div>
                <span>03</span>
                <p>Pay securely online through Square.</p>
              </div>

              <div>
                <span>04</span>
                <p>The eGift card is delivered directly by email.</p>
              </div>
            </div>

            <a href={SQUARE_EGIFT_URL} className="gift-primary-button gift-primary-button--dark">
              Purchase a Gift Voucher
            </a>

            <p className="gift-checkout-copy">
              You will continue securely to Square to personalise and purchase
              your Retreat by the Mournes eGift card.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default GiftVouchers
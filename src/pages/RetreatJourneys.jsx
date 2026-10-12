import Seo from "../components/Seo"
import { getRetreatWhatsAppUrl } from "../lib/contact"
import journeyHeroImage from "../assets/retreat/web/DSC_9638.jpg"
import recoveryImage from "../assets/retreat/web/DSC_9659.jpg"
import resetImage from "../assets/retreat/web/DSC_9734.jpg"
import personalImage from "../assets/retreat/web/DSC_9604.jpg"
import "../styles/retreat-journeys.css"

const journeys = [
  {
    eyebrow: "Ongoing Recovery",
    title: "The Recovery Journey",
    price: "\u00A3240",
    description:
      "A considered series of three 90-minute recovery-focused treatments for those who want ongoing support with muscular tension, training recovery and mobility.",
    details: [
      "Three 90-minute recovery treatments",
      "Treatment approach adapted at each visit",
      "Ideal for ongoing tension, training recovery and mobility support",
      "Designed to be experienced over several weeks",
    ],
    image: recoveryImage,
    imageAlt:
      "Therapeutic treatment at Retreat by the Mournes",
  },
  {
    eyebrow: "Signature Journey",
    title: "The Mourne Reset",
    price: "\u00A3170",
    description:
      "A two-part restorative experience combining focused therapeutic bodywork with a slower, deeply nurturing head-to-toe retreat.",
    details: [
      "Mourne Recovery Therapy",
      "The Mourne Head-to-Toe Retreat",
      "A balance of therapeutic recovery and restorative care",
      "Best experienced across two separate visits",
    ],
    image: resetImage,
    imageAlt:
      "Restorative hands-on treatment at Retreat by the Mournes",
    signature: true,
  },
  {
    eyebrow: "Personalised Care",
    title: "A Personal Retreat Journey",
    price: "From \u00A3225",
    description:
      "A personalised series of treatments created around how you want to feel, whether the focus is recovery, rest, stress relief or a combination of both.",
    details: [
      "A treatment journey shaped around your individual needs",
      "A considered blend of recovery and restorative treatments",
      "Your plan can evolve from visit to visit",
      "Ideal for those seeking longer-term wellbeing support",
    ],
    image: personalImage,
    imageAlt:
      "Treatment room at Retreat by the Mournes",
  },
]

function journeyWhatsAppUrl(journey) {
  return getRetreatWhatsAppUrl(
    `Hi Beata, I'd like to enquire about ${journey.title} (${journey.price}). Please let me know a little more about how the journey works and what availability you have. Thank you.`
  )
}

function RetreatJourneys() {
  return (
    <>
      <Seo
        title="Retreat Journeys | Retreat by the Mournes"
        description="Discover curated treatment journeys at Retreat by the Mournes in Newcastle, County Down, created for ongoing recovery, restoration and personalised wellbeing."
        path="/retreat-journeys"
      />

      <main className="journeys-page">
        <section className="journeys-hero">
          <div className="journeys-hero__media">
            <img
              src={journeyHeroImage}
              alt="Arriving at Retreat by the Mournes"
            />
          </div>

          <div className="journeys-hero__overlay" />

          <div className="journeys-hero__inner">
            <span className="journeys-eyebrow journeys-eyebrow--light">
              Retreat Journeys
            </span>

            <h1>Care that continues beyond a single treatment.</h1>

            <p>
              Curated treatment journeys designed for deeper recovery,
              restoration and wellbeing over time.
            </p>

            <a
              href={getRetreatWhatsAppUrl(
                "Hi Beata, I'd like to find out which Retreat Journey would suit me best."
              )}
              className="journeys-primary-button journeys-primary-button--light"
            >
              Find Your Journey
            </a>
          </div>
        </section>

        <section className="journeys-intro">
          <span className="journeys-eyebrow">A more considered approach</span>

          <h2>Some things are better supported over time.</h2>

          <p>
            Retreat Journeys are for those who want more than a one-off
            appointment. Each journey creates space for treatment to evolve
            across a series of visits, allowing Beata to respond to how your
            body feels, what you need and what will support you best.
          </p>
        </section>

        <section
          className="journeys-list"
          aria-label="Retreat Journey options"
        >
          {journeys.map((journey, index) => (
            <article
              className={`journey-card${
                journey.signature ? " journey-card--signature" : ""
              }${index % 2 === 1 ? " journey-card--reverse" : ""}`}
              key={journey.title}
            >
              <div className="journey-card__image">
                <img
                  src={journey.image}
                  alt={journey.imageAlt}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              <div className="journey-card__content">
                <span className="journeys-eyebrow">
                  {journey.eyebrow}
                </span>

                <div className="journey-card__heading">
                  <h2>{journey.title}</h2>
                  <span>{journey.price}</span>
                </div>

                <p className="journey-card__description">
                  {journey.description}
                </p>

                <div className="journey-card__details">
                  {journey.details.map((detail) => (
                    <div key={detail}>
                      <span aria-hidden="true">{"\u2022"}</span>
                      <p>{detail}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={journeyWhatsAppUrl(journey)}
                  className="journey-card__link"
                >
                  Enquire about this journey
                  <span aria-hidden="true">{"\u2192"}</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="journeys-personal">
          <div>
            <span className="journeys-eyebrow">
              Not sure where to begin?
            </span>

            <h2>Begin with a conversation.</h2>

            <p>
              You do not need to know exactly which treatment is right for
              you. Tell Beata what you would like help with and she can guide
              you towards the most appropriate journey.
            </p>
          </div>

          <a
            href={getRetreatWhatsAppUrl(
              "Hi Beata, I'd like some guidance on which Retreat Journey would suit me best."
            )}
            className="journeys-primary-button journeys-primary-button--dark"
          >
            Speak with Beata
          </a>
        </section>
      </main>
    </>
  )
}

export default RetreatJourneys
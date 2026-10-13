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
      "Three 90-minute recovery treatments designed to support ongoing muscular tension, mobility and physical recovery. Each visit is tailored to how your body feels on the day, allowing Beata to adapt the treatment as your needs change.",
    details: [
      "Three separate 90-minute recovery treatments",
      "Treatments may include Sports Massage Therapy, Therapeutic Deep Tissue Therapy, Myofascial Release Therapy or Mourne Recovery Therapy",
      "The treatment approach is adapted at each visit",
      "Ideal for ongoing muscular tension, training recovery and mobility support",
    ],
    howItWorks:
      "Your three treatments are booked as separate appointments over several weeks. Beata can advise on the most appropriate spacing between visits.",
    image: recoveryImage,
    imageAlt:
      "Therapeutic treatment at Retreat by the Mournes",
  },
  {
    eyebrow: "Signature Journey",
    title: "The Mourne Reset",
    price: "\u00A3170",
    description:
      "A two-part restorative journey combining focused therapeutic recovery with a slower, deeply nurturing head-to-toe retreat. Begin by working into areas of muscular tension, then return for a treatment designed to calm, restore and reset.",
    details: [
      "Visit One: Mourne Recovery Therapy — 90 minutes",
      "Visit Two: The Mourne Head-to-Toe Retreat — 90 minutes",
      "A balance of therapeutic recovery and restorative care",
      "Designed to be experienced across two separate visits",
    ],
    howItWorks:
      "The two treatments are booked separately, allowing time between visits for your body to respond. Beata can guide you on suitable timing.",
    image: resetImage,
    imageAlt:
      "Restorative hands-on treatment at Retreat by the Mournes",
    signature: true,
  },
  {
    eyebrow: "Rest & Restore",
    title: "The Rest & Restore Journey",
    price: "\u00A3235",
    description:
      "A three-part restorative journey for those who want to slow down, release tension and create space for deeper rest. Each visit offers a different form of care, moving from full-body relaxation through nourishing facial therapy to calming head, neck and face work.",
    details: [
      "Visit One: Full Body Massage, Lomi Lomi Inspired — 90 minutes",
      "Visit Two: Nourishing & Therapeutic Facial — 75 minutes",
      "Visit Three: Neck, Head & Face Massage — 90 minutes",
      "Designed for relaxation, stress relief and restorative wellbeing",
    ],
    howItWorks:
      "The three treatments are enjoyed as separate appointments over several weeks, creating an unhurried journey of ongoing rest and restoration.",
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

                <div className="journey-card__how">
                  <span>How it works</span>
                  <p>{journey.howItWorks}</p>
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
import { Link } from "react-router-dom"
import entranceImg from "../assets/retreat/web/DSC_9638.jpg"
import treatmentImg from "../assets/retreat/web/DSC_9659.jpg"
import beataImg from "../assets/retreat/web/DSC_9734.jpg"
import oilImg from "../assets/retreat/web/smile.jpg"
import exteriorImg from "../assets/retreat/web/DSC_9594.jpg"
import roomImg from "../assets/retreat/web/DSC_9604.jpg"
import stonesImg from "../assets/retreat/web/DSC_9621.jpg"
import cabinImg from "../assets/retreat/web/DSC_9598.jpg"
import "../styles/retreat-imagery.css"

export function RetreatArrival() {
  return (
    <section className="retreat-arrival" aria-label="Step inside Retreat by the Mournes">
      <div className="retreat-editorial-image retreat-editorial-image--arrival">
        <img
          src={entranceImg}
          alt="Looking into the private treatment space at Retreat by the Mournes"
          loading="lazy"
        />
      </div>

      <div className="retreat-arrival-copy">
        <span className="retreat-eyebrow">A private retreat in Newcastle</span>
        <h2>Step inside. Slow down.</h2>
        <p>
          A quiet, private space created for restorative treatments, thoughtful care
          and time away from the pace of everyday life.
        </p>
      </div>
    </section>
  )
}

export function RetreatTreatmentStory() {
  return (
    <section className="retreat-treatment-story">
      <div className="retreat-treatment-story__image">
        <img
          src={treatmentImg}
          alt="Personalised hands-on treatment at Retreat by the Mournes"
          loading="lazy"
        />
      </div>

      <div className="retreat-treatment-story__copy">
        <span className="retreat-eyebrow">Personalised care</span>
        <h2>Treatment shaped around you.</h2>
        <p>
          Every appointment is one-to-one and thoughtfully tailored, combining
          experience, touch and restorative techniques around what your body needs.
        </p>
        <Link to="/treatments" className="retreat-text-link">
          Explore treatments <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export function RetreatBeataStory() {
  return (
    <section className="retreat-beata-story">
      <div className="retreat-beata-story__image">
        <img
          src={beataImg}
          alt="Beata providing a treatment at Retreat by the Mournes"
          loading="lazy"
        />
      </div>

      <div className="retreat-beata-story__copy">
        <span className="retreat-eyebrow">Your therapist</span>
        <h2>Experienced care, quietly personal.</h2>
        <p>
          Beata brings more than 20 years of experience to a calm, intuitive approach
          where every session begins with listening and every treatment is individual.
        </p>
        <Link to="/about" className="retreat-text-link">
          Meet Beata <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export function RetreatSensoryBreak() {
  return (
    <section className="retreat-sensory" aria-label="A moment of restorative care">
      <img
        src={oilImg}
        alt="Treatment oil being prepared for a restorative therapy"
        loading="lazy"
      />
      <div className="retreat-sensory__overlay">
        <p>Time to switch off.</p>
      </div>
    </section>
  )
}

export function RetreatSpaces() {
  return (
    <section className="retreat-spaces">
      <div className="retreat-spaces__intro">
        <span className="retreat-eyebrow">Retreat by the Mournes</span>
        <h2>A quiet space in the Mournes.</h2>
        <p>
          From the moment you arrive, the experience is designed to feel private,
          unhurried and restorative.
        </p>
      </div>

      <div className="retreat-spaces__grid">
        <figure className="retreat-spaces__item retreat-spaces__item--large">
          <img
            src={exteriorImg}
            alt="Exterior of Retreat by the Mournes in Newcastle"
            loading="lazy"
          />
        </figure>

        <figure className="retreat-spaces__item">
          <img
            src={roomImg}
            alt="Private treatment room at Retreat by the Mournes"
            loading="lazy"
          />
        </figure>

        <figure className="retreat-spaces__item">
          <img
            src={stonesImg}
            alt="Hot stones prepared for a treatment"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  )
}

export function RetreatArrivalDetail() {
  return (
    <div className="retreat-cabin-detail">
      <img
        src={cabinImg}
        alt="The Cabin entrance at Retreat by the Mournes"
        loading="lazy"
      />
      <div className="retreat-cabin-detail__copy">
        <span className="retreat-eyebrow">Your arrival</span>
        <p>8 Church Hill · Newcastle · County Down</p>
      </div>
    </div>
  )
}

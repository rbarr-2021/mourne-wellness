import Hero from "../components/Hero"
import TrustSection from "../components/TrustSection"
import Services from "../components/Services"
import Contact from "../components/Contact"
import WhatsAppButton from "../components/WhatsAppButton"
import AboutTestimonials from "../components/AboutTestimonials"
import Seo from "../components/Seo"

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Retreat by the Mournes",
    url: "https://www.mourneretreat.co.uk/",
  },
  {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Retreat by the Mournes",
    image: "https://www.mourneretreat.co.uk/preview.jpg",
    url: "https://www.mourneretreat.co.uk/",
    telephone: "+44 7591 383215",
    email: "beata@mourneretreat.co.uk",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8 Church Hill",
      addressLocality: "Newcastle",
      addressRegion: "County Down",
      postalCode: "BT33 0JU",
      addressCountry: "GB",
    },
    areaServed: "Northern Ireland",
    sameAs: [
      "https://www.instagram.com/p/DWveVvPiNCq/",
      "https://www.facebook.com/people/Holistic-Sports-Therapy-by-Beata/61581068248993/",
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "10:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "10:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "10:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "10:00", closes: "16:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Retreat by the Mournes | Boutique Wellness & Massage in Newcastle, Co. Down",
    url: "https://www.mourneretreat.co.uk/",
    description:
      "Retreat by the Mournes offers premium massage, sports therapy, facials and restorative wellness treatments in Newcastle, County Down beneath the Mourne Mountains.",
  },
]

function Home() {
  return (
    <>
      <Seo
        title="Retreat by the Mournes | Boutique Wellness & Massage in Newcastle, Co. Down"
        description="Retreat by the Mournes offers premium massage, sports therapy, facials and restorative wellness treatments in Newcastle, County Down beneath the Mourne Mountains."
        path="/"
        structuredData={homeStructuredData}
      />
      <Hero />
      <TrustSection />
      <Services />
      <AboutTestimonials />
      <Contact />
      <WhatsAppButton />
    </>
  )
}

export default Home

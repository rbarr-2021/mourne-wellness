import Hero from "../components/Hero"
import Services from "../components/Services"
import Contact from "../components/Contact"
import WhatsAppButton from "../components/WhatsAppButton"
import AboutTestimonials from "../components/AboutTestimonials"

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutTestimonials />
      <Contact />
      <WhatsAppButton />
    </>
  )
}

export default Home
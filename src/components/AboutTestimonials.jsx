import "../styles/global.css"

function AboutTestimonials() {
  const testimonials = [
    {
      quote: "I’ve been going to Beata for over 16 years for deep tissue massages, and I honestly can’t recommend her highly enough. She is so professional and welcoming and always makes me feel comfortable and relaxed at every appointment. What really stands out is her consistency and attention to detail. She takes the time to listen, and makes sure you leave feeling better every single time. After so many years, I can honestly say Beata is the best, and you won’t find better",
      author: "E. R., Newcastle"
    },
    {
      quote: "I have been going to Beata for 10 years now for her amazing Sports massages . Her professionalism , knowledge and skill is incredible I would highly recommend her as a massage therapist",
      author: "P. H., Newcastle"
    },
    {
      quote: "Beata came to my rescue after a neural back & hamstring flare up when I was out running. She fitted me in so quickly and was able to pin point the areas of my body that was causing tension. The treatment not only eased my pain but also helped me relax mentally.",
      author: "Kerry, Dundrum"
    }
  ]

  return (
    <section style={{
      padding: "var(--section-padding)",
      background: "var(--bg-main)",
      color: "var(--text-dark)",
      textAlign: "center"
    }}>
      
      {/* 🌿 About Section */}
      <div style={{ maxWidth: "900px", margin: "0 auto 60px" }}>
        <h2 style={{
          fontSize: "clamp(28px,4vw,40px)",
          fontFamily: "var(--font-heading)",
          marginBottom: "20px",
          letterSpacing: "1px"
        }}>
          About Retreat By the Mournes
        </h2>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          lineHeight: "1.8",
          color: "var(--text-light)",
          marginBottom: "15px"
        }}>
          Retreat By the Mournes is a sanctuary where mind, body, and nature harmonize. 
          Nestled in the serene Mourne Mountains, every treatment is designed to restore balance 
          and elevate wellbeing.
        </p>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          lineHeight: "1.8",
          color: "var(--text-light)"
        }}>
          Our holistic approach blends bespoke therapies, mindful practices, and luxurious surroundings 
          to create an experience of deep relaxation and rejuvenation.
        </p>
      </div>

      {/* 🌿 Testimonials Section */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "clamp(24px,3.5vw,32px)",
          fontFamily: "var(--font-heading)",
          marginBottom: "35px",
          letterSpacing: "1px"
        }}>
          What Our Guests Say
        </h2>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px"
        }}>
          {testimonials.map((t, index) => (
            <div key={index} style={{
              background: "var(--bg-card)",
              padding: "30px 25px",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
              maxWidth: "280px",
              textAlign: "left",
              transition: "transform 0.3s ease",
              cursor: "default"
            }}
            onMouseEnter={(e)=>{
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.12)"
            }}
            onMouseLeave={(e)=>{
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.05)"
            }}
            >
              <p style={{
                fontStyle: "italic",
                color: "var(--text-light)",
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                lineHeight: "1.6"
              }}>
                "{t.quote}"
              </p>
              <p style={{
                fontWeight: "600",
                marginTop: "12px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--text-dark)"
              }}>
                — {t.author}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "28px" }}>
          <a
            href="https://share.google/SkuH2ggzHH72J7vJv"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              letterSpacing: "0.3px",
              color: "var(--primary)",
              paddingBottom: "2px",
              borderBottom: "1px solid rgba(107, 162, 146, 0.35)",
            }}
          >
            Read more reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutTestimonials

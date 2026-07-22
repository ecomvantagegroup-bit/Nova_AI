import { defineComponent } from "vue";
import "./hero.css";

export default defineComponent({
  name: "Hero",

  setup() {
    const scrollToSection = (id) => {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    return () => (
      <section id="hero" class="hero">
        {/* Background Overlay */}
        <div class="hero-overlay"></div>

        {/* Animated Background */}
        <div class="hero-bg"></div>

        {/* Hero Content */}
        <div class="hero-content">
          <span class="hero-badge">
            🚀 Welcome to Nova AI
          </span>

          <h1 class="hero-title">
            Build Modern
            <span class="hero-title-gradient">
              Artificial Intelligence, Engineered for Impact.
            </span>
          </h1>

          <p class="hero-description">
            We build intelligent AI systems, autonomous agents, and scalable
            solutions that help businesses innovate, automate, and grow.
          </p>

          <div class="hero-buttons">
            <button
              onClick={() => scrollToSection("about")}
              class="btn-primary"
            >
              Get Started
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              class="btn-secondary"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("about")}
          class="scroll-indicator"
        >
          ↓
        </button>
      </section>
    );
  },
});
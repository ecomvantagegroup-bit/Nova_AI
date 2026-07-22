import { defineComponent } from "vue";
import "./hero.css";

export default defineComponent({
  name: "Hero",

  setup() {
    const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    };

    return () => (
      <section id="hero" class="hero">
        {/* Background */}
        <div class="hero-overlay"></div>
        <div class="hero-bg"></div>

        <div class="hero-content">
          {/* Left */}
          <div class="hero-left">
            <span class="hero-badge">
              AI • Automation • Innovation
            </span>

            <h1 class="hero-title">
              Building the
              <span class="hero-title-gradient">
                next generation
              </span>
              of intelligent software.
            </h1>

            <p class="hero-description">
              Nova AI designs intelligent applications, autonomous agents, and
              scalable AI solutions that help businesses automate workflows,
              improve decision-making, and accelerate growth.
            </p>

            <div class="hero-buttons">
              <button
                class="btn-primary"
                onClick={() => scrollToSection("contact")}
              >
                Start a Project
              </button>

              <button
                class="btn-secondary"
                onClick={() => scrollToSection("about")}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right */}
          <div class="hero-right">
            <div class="hero-animation">
              {/* Three.js Canvas */}
              {/* <HeroCanvas /> */}

              {/* OR GIF */}
              {/* <img src="/hero.gif" alt="AI Animation" /> */}
            </div>
          </div>
        </div>

        <button
          class="scroll-indicator"
          onClick={() => scrollToSection("about")}
          aria-label="Scroll Down"
        >
          ↓
        </button>
      </section>
    );
  },
});
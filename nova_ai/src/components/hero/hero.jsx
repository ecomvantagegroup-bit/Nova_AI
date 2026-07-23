import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./hero.css";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: "Hero",

  setup() {
    const heroRef = ref(null);
    let ctx = null;

    const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    };

    onMounted(() => {
      // Create scoped GSAP context tied to the container ref
      ctx = gsap.context(() => {
        // Entrance Timeline
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        heroTimeline
          .from(".hero-overlay", { opacity: 0, duration: 0.8 })
          .from(".hero-bg", { opacity: 0, scale: 1.15, duration: 1.4 }, "-=0.5")
          .from(".hero-badge", { opacity: 0, y: 30, duration: 0.5 }, "-=0.8")
          .from(".hero-title", { opacity: 0, y: 60, duration: 0.8 }, "-=0.2")
          .from(".hero-description", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
          .from(
            ".hero-buttons button",
            {
              opacity: 0,
              y: 25,
              scale: 0.9,
              stagger: 0.15,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.2"
          )
          .from(
            ".hero-animation",
            { opacity: 0, x: 80, scale: 0.9, duration: 1 },
            "-=0.5"
          )
          .from(
            ".scroll-indicator",
            { opacity: 0, y: 20, duration: 0.5 },
            "-=0.4"
          );

        // ScrollTrigger setup
        ScrollTrigger.create({
          trigger: heroRef.value,
          start: "top 75%",
          end: "bottom 25%",
          animation: heroTimeline,
          toggleActions: "restart reset restart reset",
        });

        // Floating Ambient Animations
        gsap.to(".hero-animation", {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".scroll-indicator", {
          y: 10,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        gsap.to(".hero-title-gradient", {
          backgroundPosition: "200% center",
          duration: 6,
          repeat: -1,
          ease: "none",
        });

        // Parallax Effects
        gsap.to(".hero-bg", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.value,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-title", {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.value,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, heroRef.value);
    });

    onBeforeUnmount(() => {
      // Reverts all timelines, tweens & ScrollTriggers scoped to heroRef
      ctx?.revert();
    });

    return () => (
      <section ref={heroRef} id="hero" class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-bg"></div>

        <div class="hero-content">
          <div class="hero-left">
            <span class="hero-badge">AI • Automation • Innovation</span>

            <h1 class="hero-title">
              Building the{" "}
              <span class="hero-title-gradient">next generation</span> of
              intelligent software.
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

          <div class="hero-right">
            <div class="hero-animation">
              {/* Canvas / Illustration target */}
            </div>
          </div>
        </div>

        <button
          class="scroll-indicator"
          aria-label="Scroll Down"
          onClick={() => scrollToSection("about")}
        >
          ↓
        </button>
      </section>
    );
  },
});
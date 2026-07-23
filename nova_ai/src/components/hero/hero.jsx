import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./hero_canvas.jsx";
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

      ctx = gsap.context(() => {

        const heroTimeline = gsap.timeline({
          defaults: {
            ease: "power2.out",
            duration: 0.2,
          },
        });

        heroTimeline
          .from(".hero-overlay", {
            opacity: 0,
            duration: 0.25,
          })

          .from(
            ".hero-bg",
            {
              opacity: 0,
              scale: 1.05,
              duration: 0.45,
            },
            "-=0.15"
          )

          .from(
            ".hero-badge",
            {
              opacity: 0,
              y: 18,
              duration: 0.3,
            },
            "-=0.2"
          )

          .from(
            ".hero-title",
            {
              opacity: 0,
              y: 30,
              duration: 0.45,
            },
            "-=0.15"
          )

          .from(
            ".hero-description",
            {
              opacity: 0,
              y: 18,
              duration: 0.35,
            },
            "-=0.2"
          )

          .from(
            ".hero-buttons button",
            {
              opacity: 0,
              y: 16,
              scale: 0.96,
              stagger: 0.08,
              duration: 0.3,
              ease: "back.out(1.3)",
            },
            "-=0.15"
          )

          .from(
            ".hero-animation",
            {
              opacity: 0,
              x: 35,
              scale: 0.97,
              duration: 0.45,
            },
            "-=0.2"
          )

          .from(
            ".scroll-indicator",
            {
              opacity: 0,
              y: 10,
              duration: 0.25,
            },
            "-=0.2"
          );

        ScrollTrigger.create({
          trigger: heroRef.value,
          start: "top 80%",
          end: "bottom 20%",
          animation: heroTimeline,
          toggleActions: "restart reset restart reset",
        });

        // Floating Illustration
        gsap.to(".hero-animation", {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Scroll Indicator
        gsap.to(".scroll-indicator", {
          y: 6,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        // Animated Gradient
        gsap.to(".hero-title-gradient", {
          backgroundPosition: "200% center",
          duration: 4,
          repeat: -1,
          ease: "none",
        });

        // Background Parallax
        gsap.to(".hero-bg", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.value,
            scrub: true,
          },
        });

        // Title Parallax
        gsap.to(".hero-title", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.value,
            scrub: true,
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
              <HeroCanvas />
            </div>
          </div>
        </div>

      </section>
    );
  },
});
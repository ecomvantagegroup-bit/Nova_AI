import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
} from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./hero.css";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: "Hero",

  setup() {
    // ============================
    // Element Refs
    // ============================

    const heroRef = ref(null);

    const overlayRef = ref(null);
    const bgRef = ref(null);

    const badgeRef = ref(null);
    const titleRef = ref(null);
    const gradientRef = ref(null);
    const descriptionRef = ref(null);

    const buttonsRef = ref(null);

    const animationRef = ref(null);

    const scrollIndicatorRef = ref(null);

    let heroTimeline = null;

    // ============================
    // Smooth Scroll
    // ============================

    const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    };

    // ============================
    // Animations
    // ============================

    onMounted(() => {
      heroTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline

        // Background
        .from(
          overlayRef.value,
          {
            opacity: 0,
            duration: 0.8,
          }
        )

        .from(
          bgRef.value,
          {
            opacity: 0,
            scale: 1.15,
            duration: 1.4,
          },
          "-=0.5"
        )

        // Badge
        .from(
          badgeRef.value,
          {
            opacity: 0,
            y: 30,
            duration: 0.5,
          },
          "-=0.8"
        )

        // Title
        .from(
          titleRef.value,
          {
            opacity: 0,
            y: 60,
            duration: 0.8,
          },
          "-=0.2"
        )

        // Description
        .from(
          descriptionRef.value,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          "-=0.4"
        )

        // Buttons
        .from(
          buttonsRef.value.children,
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

        // Right Illustration
        .from(
          animationRef.value,
          {
            opacity: 0,
            x: 80,
            scale: 0.9,
            duration: 1,
          },
          "-=0.5"
        )

        // Scroll Indicator
        .from(
          scrollIndicatorRef.value,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.4"
        );

      // ==================================
      // Replay animation on every visit
      // ==================================

      ScrollTrigger.create({
        trigger: heroRef.value,

        start: "top 75%",

        end: "bottom 25%",

        animation: heroTimeline,

        toggleActions: "restart reset restart reset",
      });

      // ==================================
      // Floating Illustration
      // ==================================

      gsap.to(animationRef.value, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ==================================
      // Scroll Indicator Bounce
      // ==================================

      gsap.to(scrollIndicatorRef.value, {
        y: 10,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // ==================================
      // Animated Gradient Text
      // ==================================

      gsap.to(gradientRef.value, {
        backgroundPosition: "200% center",
        duration: 6,
        repeat: -1,
        ease: "none",
      });

      // ==================================
      // Optional Background Parallax
      // ==================================

      gsap.to(bgRef.value, {
        yPercent: 15,

        ease: "none",

        scrollTrigger: {
          trigger: heroRef.value,

          start: "top bottom",

          end: "bottom top",

          scrub: true,
        },
      });

      // ==================================
      // Hero Content Parallax
      // ==================================

      gsap.to(titleRef.value, {
        yPercent: -15,

        ease: "none",

        scrollTrigger: {
          trigger: heroRef.value,

          start: "top bottom",

          end: "bottom top",

          scrub: 1,
        },
      });
    });

    onBeforeUnmount(() => {
      heroTimeline?.kill();

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      gsap.killTweensOf([
        overlayRef.value,
        bgRef.value,
        badgeRef.value,
        titleRef.value,
        gradientRef.value,
        descriptionRef.value,
        animationRef.value,
        scrollIndicatorRef.value,
      ]);
    });
        return () => (
      <section ref={heroRef} id="hero" class="hero">
        {/* ==========================
            Background
        ========================== */}

        <div ref={overlayRef} class="hero-overlay"></div>

        <div ref={bgRef} class="hero-bg"></div>

        {/* ==========================
            Main Content
        ========================== */}

        <div class="hero-content">

          {/* Left Side */}

          <div class="hero-left">

            <span ref={badgeRef} class="hero-badge">
              AI • Automation • Innovation
            </span>

            <h1 ref={titleRef} class="hero-title">
              Building the

              <span
                ref={gradientRef}
                class="hero-title-gradient"
              >
                next generation
              </span>

              of intelligent software.
            </h1>

            <p
              ref={descriptionRef}
              class="hero-description"
            >
              Nova AI designs intelligent applications,
              autonomous agents, and scalable AI solutions
              that help businesses automate workflows,
              improve decision-making, and accelerate
              growth.
            </p>

            <div
              ref={buttonsRef}
              class="hero-buttons"
            >
              <button
                class="btn-primary"
                onClick={() =>
                  scrollToSection("contact")
                }
              >
                Start a Project
              </button>

              <button
                class="btn-secondary"
                onClick={() =>
                  scrollToSection("about")
                }
              >
                Learn More
              </button>
            </div>

          </div>

          {/* Right Side */}

          <div class="hero-right">

            <div
              ref={animationRef}
              class="hero-animation"
            >
              {/* =====================================

                 Three.js Canvas

                 <HeroCanvas />

                 OR

                 <img
                   src="/hero.gif"
                   alt="AI Animation"
                 />

              ====================================== */}
            </div>

          </div>

        </div>

        {/* ==========================
            Scroll Indicator
        ========================== */}

        <button
          ref={scrollIndicatorRef}
          class="scroll-indicator"
          aria-label="Scroll Down"
          onClick={() =>
            scrollToSection("about")
          }
        >
          ↓
        </button>
      </section>
    );
  },
});
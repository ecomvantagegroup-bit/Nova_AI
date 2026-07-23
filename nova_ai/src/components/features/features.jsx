import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import FeatureCard from "./featuresCards.jsx";
import "./features.css";

gsap.registerPlugin(ScrollTrigger, Flip);

const featureItems = [
  {
    id: "ai-chatbots",
    iconName: "Bot",
    title: "AI Chatbots",
    description:
      "Context-aware conversational agents trained on your domain data to resolve up to 80% of customer queries instantly.",
    tag: "Conversational AI",
  },
  {
    id: "workflow-automation",
    iconName: "Workflow",
    title: "Workflow Automation",
    description:
      "Autonomous AI agents that execute multi-step business logic across hundreds of integrations with human-in-the-loop oversight.",
    tag: "Process Automation",
  },
  {
    id: "knowledge-search",
    iconName: "Search",
    title: "Knowledge Search",
    description:
      "Neural semantic search over PDFs, Notion, and databases that delivers direct, cited answers rather than raw link pages.",
    tag: "RAG & Search",
  },
  {
    id: "voice-ai",
    iconName: "Mic",
    title: "Voice AI",
    description:
      "Ultra-low latency conversational voice interfaces capable of natural phone support, booking, and real-time audio analysis.",
    tag: "Speech Synthesis",
  },
  {
    id: "analytics",
    iconName: "Analytics",
    title: "Predictive Analytics",
    description:
      "Transform operational telemetry into proactive trends, forecasting capacity needs, churn risk, and revenue opportunities.",
    tag: "Business Intelligence",
  },
  {
    id: "enterprise-security",
    iconName: "Shield",
    title: "Enterprise Security",
    description:
      "Bank-grade SOC2 Type II compliant guardrails with granular RBAC, private model hosting, and zero data-retention guarantees.",
    tag: "Governance & Privacy",
  },
];

export default defineComponent({
  name: "Features",

  setup() {
    const featuresRef = ref(null);
    const modalRef = ref(null);
    const activeCardId = ref(null);
    let activeIndex = null;
    let ctx = null;

    // Open Card Modal using GSAP Flip
    const openModal = (id) => {
      const cardIndex = featureItems.findIndex((item) => item.id === id);
      if (cardIndex === -1) return;

      const cardEl = featuresRef.value.querySelector(`[data-card-content="${id}"]`);
      const modalContentEl = modalRef.value.querySelector(".content");
      const overlayEl = modalRef.value.querySelector(".overlay");

      if (!cardEl || !modalContentEl) return;

      const state = Flip.getState(cardEl);

      // Move element to Modal Container
      modalContentEl.appendChild(cardEl);
      activeCardId.value = id;
      activeIndex = cardIndex;

      // Make Modal Container Visible
      gsap.set(modalRef.value, { autoAlpha: 1 });
      gsap.to(overlayEl, { autoAlpha: 0.75, duration: 0.35, ease: "power1.inOut" });

      // Execute Flip Animation
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          // Reveal inner expanded details
          const innerDetails = cardEl.querySelector(".modal-inner-details");
          if (innerDetails) {
            gsap.fromTo(
              innerDetails.children,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" }
            );
          }
        },
      });
    };

    // Close Modal and return card back to its Grid Box
    const closeModal = () => {
      if (activeIndex === null || !activeCardId.value) return;

      const cardEl = modalRef.value.querySelector(`[data-card-content="${activeCardId.value}"]`);
      const gridBoxContainers = featuresRef.value.querySelectorAll(".box");
      const targetGridBox = gridBoxContainers[activeIndex];
      const overlayEl = modalRef.value.querySelector(".overlay");

      if (!cardEl || !targetGridBox) return;

      const state = Flip.getState(cardEl);

      // Return element to original grid container
      targetGridBox.appendChild(cardEl);

      // Fade out Overlay and Modal
      gsap.to([modalRef.value, overlayEl], {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power1.inOut",
      });

      // Execute Flip Back
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        absolute: true,
        onComplete: () => {
          activeCardId.value = null;
          activeIndex = null;
          gsap.set(cardEl, { zIndex: "auto" });
        },
      });

      gsap.set(cardEl, { zIndex: 1002 });
    };

    onMounted(() => {
      ctx = gsap.context(() => {
        // Master Entrance Timeline
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: featuresRef.value,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });

        // 1. Badge Slide & Fade
        headerTl
          .from(".features-badge", {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.out",
          })
          // 2. Title Reveal
          .from(
            ".features-title",
            {
              opacity: 0,
              y: 28,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.25"
          )
          // 3. Description Reveal
          .from(
            ".features-description",
            {
              opacity: 0,
              y: 20,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.3"
          );

        // Continuous Animated Gradient on Title
        gsap.to(".features-title-gradient", {
          backgroundPosition: "200% center",
          duration: 5,
          repeat: -1,
          ease: "none",
        });

        // Grid Box Entrance Sequence
        gsap.from(".box", {
          opacity: 0,
          y: 40,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity", // Clears GSAP overrides so hover styles work seamlessly
          scrollTrigger: {
            trigger: ".boxes-container",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      }, featuresRef.value);
    });

    onBeforeUnmount(() => {
      ctx?.revert();
    });

    return () => {
      return (
        <section ref={featuresRef} id="features" class="wrapper features-section">
          {/* Background Overlays */}
          <div class="features-overlay"></div>
          <div class="features-bg-glow"></div>

          {/* Section Header */}
          <div class="features-header">
            <span class="features-badge">Capabilities</span>
            <h2 class="features-title">
              Everything you need to build{" "}
              <span class="features-title-gradient">intelligent systems.</span>
            </h2>
            <p class="features-description">
              Power your business operations with an enterprise-ready AI suite designed
              for speed, accuracy, and enterprise reliability.
            </p>
          </div>

          {/* Grid Box Containers */}
          <div class="boxes-container">
            {featureItems.map((feature) => (
              <div key={feature.id} class="box">
                <FeatureCard
                  feature={feature}
                  isExpanded={activeCardId.value === feature.id}
                  onOpen={openModal}
                  onClose={closeModal}
                />
              </div>
            ))}
          </div>

          {/* FLIP Modal Portal Container */}
          <div ref={modalRef} class="modal">
            <div class="overlay" onClick={closeModal}></div>
            <div class="content"></div>
          </div>
        </section>
      );
    };
  },
});
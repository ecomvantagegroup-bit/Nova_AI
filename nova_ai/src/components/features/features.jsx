import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";
import "./features.css";

gsap.registerPlugin(ScrollTrigger);

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
    let ctx = null;

    onMounted(() => {
      // Scoped GSAP Context bound to container element
      ctx = gsap.context(() => {
        // Entrance Timeline for Header
        const headerTL = gsap.timeline({
          scrollTrigger: {
            trigger: featuresRef.value,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        headerTL
          .from(".features-overlay", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          })
          .from(
            ".features-badge",
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            ".features-title",
            {
              opacity: 0,
              y: 30,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.3"
          )
          .from(
            ".features-description",
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.3"
          );

        // Staggered reveal targeting individual .feature-card instances
        gsap.from(".feature-card", {
          opacity: 0,
          y: 50,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }, featuresRef.value);
    });

    onBeforeUnmount(() => {
      ctx?.revert();
    });

    return () => (
      <section ref={featuresRef} id="features" class="features-section">
        {/* Background Overlay Effects */}
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

        {/* Grid Container rendering template components */}
        <div class="features-grid">
          {featureItems.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              tag={feature.tag}
              iconName={feature.iconName}
            />
          ))}
        </div>
      </section>
    );
  },
});
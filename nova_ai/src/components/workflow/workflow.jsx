import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./workflow.css";

gsap.registerPlugin(ScrollTrigger);

const workflowSteps = [
  {
    step: "01",
    title: "Idea & Architecture",
    category: "Ingestion",
    description:
      "Define autonomous goals and model constraints. Nova AI ingests raw operational context into neural intent frameworks.",
    icon: "💡",
    accent: "from-cyan-500 to-blue-500",
    borderGlow: "rgba(6, 182, 212, 0.4)",
    details: ["Neural Graph Setup", "Constraint Mapping", "Intent Vectorization"],
  },
  {
    step: "02",
    title: "Model Training",
    category: "Optimization",
    description:
      "Self-supervised reinforcement loops continuously fine-tune micro-agents on specialized domain parameters.",
    icon: "⚡",
    accent: "from-blue-500 to-purple-500",
    borderGlow: "rgba(147, 51, 234, 0.4)",
    details: ["Reinforcement Loops", "Synthetic Fine-Tuning", "Zero-Latency Alignment"],
  },
  {
    step: "03",
    title: "Edge Deployment",
    category: "Orchestration",
    description:
      "Air-gapped deployment across cloud nodes with automated sub-millisecond failovers and instant sync.",
    icon: "🚀",
    accent: "from-purple-500 to-pink-500",
    borderGlow: "rgba(236, 72, 153, 0.4)",
    details: ["Private Perimeter", "Sub-ms Synthesis", "Global Edge Sync"],
  },
  {
    step: "04",
    title: "Full Automation",
    category: "Autonomic State",
    description:
      "Agent clusters execute tasks independently with real-time telemetry, auto-remediation, and zero operational friction.",
    icon: "🤖",
    accent: "from-pink-500 to-emerald-400",
    borderGlow: "rgba(52, 211, 153, 0.4)",
    details: ["Self-Healing Mesh", "Adaptive Execution", "Autonomous Telemetry"],
  },
];

export default defineComponent({
  name: "WorkFlow",

  setup() {
    const sectionRef = ref(null);
    const lineRef = ref(null);
    let ctx = null;

    onMounted(() => {
      const container = sectionRef.value;
      if (!container) return;

      ctx = gsap.context(() => {
        // --- 1. SVG Timeline Path Reveal Animation ---
        if (lineRef.value) {
          const pathLength = lineRef.value.getTotalLength();
          gsap.set(lineRef.value, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          gsap.to(lineRef.value, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          });
        }

        // --- 2. Staggered Card & Node Entrance ---
        const cards = gsap.utils.toArray(".workflow-card", container);
        cards.forEach((card, i) => {
          const isEven = i % 2 === 0;

          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              x: isEven ? -60 : 60,
              y: 30,
              scale: 0.95,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // --- 3. Node Pulse Rings Entrance ---
        const nodes = gsap.utils.toArray(".workflow-node", container);
        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { scale: 0, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.6,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: node,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, container);
    });

    onBeforeUnmount(() => {
      ctx?.revert();
    });

    return () => (
      <section
        ref={sectionRef}
        id="workflow"
        class="relative w-full py-28 bg-slate-950 overflow-hidden text-white"
      >
        {/* Background Radial Glow Effects */}
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div class="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/60 text-cyan-300 text-xs font-bold tracking-widest uppercase">
              Operational Lifecycle
            </span>
            <h2 class="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              How Nova AI Operates
            </h2>
            <p class="text-slate-400 text-lg leading-relaxed">
              From raw neural prompts to autonomous enterprise orchestration in 4 effortless phases.
            </p>
          </div>

          {/* Timeline Container */}
          <div class="relative mt-16">
            {/* SVG Connecting Line (Desktop Center) */}
            <svg
              class="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-2 h-full z-0 pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 2 1000"
            >
              {/* Background Dim Line */}
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="1000"
                stroke="rgba(51, 65, 85, 0.4)"
                stroke-width="2"
              />
              {/* Animated Gradient Line */}
              <line
                ref={lineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="1000"
                stroke="url(#timeline-grad)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#06b6d4" />
                  <stop offset="50%" stop-color="#a855f7" />
                  <stop offset="100%" stop-color="#34d399" />
                </linearGradient>
              </defs>
            </svg>

            {/* Steps Grid */}
            <div class="space-y-16 lg:space-y-24">
              {workflowSteps.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.step}
                    class={`relative flex flex-col lg:flex-row items-center ${
                      isEven ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Empty spacer column for layout symmetry on Desktop */}
                    <div class="hidden lg:block w-1/2" />

                    {/* Timeline Node Center Badge */}
                    <div class="workflow-node absolute left-4 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                      <div class="relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 shadow-xl shadow-cyan-500/10">
                        <span class="text-sm font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          {item.step}
                        </span>
                        {/* Glowing ring animation */}
                        <div class="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping pointer-events-none opacity-40" />
                      </div>
                    </div>

                    {/* Step Card Content */}
                    <div class="w-full lg:w-1/2 pl-12 lg:pl-0 lg:px-10">
                      <div
                        class="workflow-card relative group p-8 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 transition-all duration-500 shadow-2xl overflow-hidden"
                        style={{ "--hover-glow": item.borderGlow }}
                      >
                        {/* Top Gradient Bar */}
                        <div
                          class={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent} opacity-80 group-hover:opacity-100 transition-opacity`}
                        />

                        {/* Top Metadata */}
                        <div class="flex items-center justify-between mb-4">
                          <span class="text-xs font-bold tracking-widest uppercase text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-3 py-1 rounded-full">
                            {item.category}
                          </span>
                          <span class="text-3xl">{item.icon}</span>
                        </div>

                        {/* Title & Description */}
                        <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        <p class="text-slate-300 text-sm leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {/* Detail Tags */}
                        <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-800/60">
                          {item.details.map((detail, dIdx) => (
                            <span
                              key={dIdx}
                              class="text-[11px] font-medium text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/80"
                            >
                              ✓ {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  },
});
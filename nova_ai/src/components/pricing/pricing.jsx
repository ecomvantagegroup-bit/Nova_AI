import { defineComponent, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./pricing.css";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "starter",
    name: "Starter",
    badge: "Indie & Teams",
    desc: "Perfect for exploring autonomous workflows and prototyping.",
    monthlyPrice: 29,
    yearlyPrice: 24,
    popular: false,
    accent: "from-slate-600 via-slate-500 to-slate-400",
    glowColor: "rgba(148, 163, 184, 0.15)",
    ctaText: "Start Free Trial",
    ctaClass: "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700",
    features: [
      "Up to 2 Autonomous Agents",
      "50,000 API Executions / mo",
      "Standard Latency (~50ms)",
      "Community Discord Support",
      "Basic Neural Graph Integration",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    badge: "Most Popular",
    desc: "For fast-scaling engineering teams needing high speed and reliability.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    popular: true,
    accent: "from-cyan-400 via-blue-500 to-purple-500",
    glowColor: "rgba(6, 182, 212, 0.3)",
    ctaText: "Get Started Now",
    ctaClass:
      "bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 text-slate-950 font-extrabold hover:opacity-95 shadow-lg shadow-cyan-500/20",
    features: [
      "Up to 10 Autonomous Agents",
      "500,000 API Executions / mo",
      "Sub-millisecond Real-time Synthesis",
      "Self-Healing Infrastructure Loops",
      "24/7 Priority Engineer Support",
      "Standard Private Perimeter",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Custom Scale",
    desc: "Dedicated infrastructure, air-gapped security, and infinite agent scale.",
    monthlyPrice: 299,
    yearlyPrice: 239,
    popular: false,
    accent: "from-purple-500 via-pink-500 to-emerald-400",
    glowColor: "rgba(168, 85, 247, 0.2)",
    ctaText: "Contact Sales",
    ctaClass: "bg-purple-950/80 text-purple-200 border border-purple-700/60 hover:bg-purple-900/80",
    features: [
      "Unlimited Autonomous Agents",
      "Unlimited API Executions",
      "Zero-Latency Custom Model Mesh",
      "Air-Gapped Private Perimeter",
      "Dedicated Solutions Architect",
      "Custom SLA & Compliance Guarantees",
    ],
  },
];

export default defineComponent({
  name: "Pricing",

  setup() {
    const sectionRef = ref(null);
    const isYearly = ref(true);
    let ctx = null;

    const toggleBilling = () => {
      // Animate price cards on toggle switch
      const cards = gsap.utils.toArray(".pricing-card", sectionRef.value);
      
      gsap.to(cards, {
        scale: 0.97,
        autoAlpha: 0.5,
        duration: 0.15,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          isYearly.value = !isYearly.value;
          
          nextTick(() => {
            gsap.fromTo(
              cards,
              { scale: 0.97, autoAlpha: 0.5, y: 15 },
              {
                scale: 1,
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: "back.out(1.7)",
              }
            );
          });
        },
      });
    };

    onMounted(() => {
      const container = sectionRef.value;
      if (!container) return;

      ctx = gsap.context(() => {
        // 1. Entrance animation for header
        gsap.fromTo(
          ".pricing-header",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 2. Staggered entrance animation for all 3 cards
        const cards = gsap.utils.toArray(".pricing-card", container);
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 60, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, container);
    });

    onBeforeUnmount(() => {
      ctx?.revert();
    });

    return () => (
      <section
        ref={sectionRef}
        id="pricing"
        class="relative w-full py-28 bg-slate-950 overflow-hidden text-white"
      >
        {/* Ambient Glows */}
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
        <div class="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div class="pricing-header text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/60 text-cyan-300 text-xs font-bold tracking-widest uppercase">
              Flexible Pricing
            </span>
            <h2 class="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Scalable Autonomous Intelligence
            </h2>
            <p class="text-slate-400 text-lg leading-relaxed">
              Choose the right capacity for your team. Scale up or down as your agent workloads expand.
            </p>

            {/* Monthly / Yearly Billing Toggle */}
            <div class="pt-6 flex items-center justify-center space-x-4">
              <span
                class={`text-sm font-semibold transition-colors ${
                  !isYearly.value ? "text-cyan-300" : "text-slate-400"
                }`}
              >
                Monthly
              </span>
              <button
                type="button"
                onClick={toggleBilling}
                class="relative w-14 h-8 flex items-center rounded-full bg-slate-800 p-1 border border-slate-700 cursor-pointer focus:outline-none"
                aria-label="Toggle billing cycle"
              >
                <div
                  class={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md transform transition-transform duration-300 ${
                    isYearly.value ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                class={`text-sm font-semibold flex items-center space-x-2 transition-colors ${
                  isYearly.value ? "text-cyan-300" : "text-slate-400"
                }`}
              >
                <span>Yearly</span>
                <span class="text-[10px] uppercase font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* 3-Card Grid */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const price = isYearly.value ? plan.yearlyPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  class={[
                    "pricing-card relative p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border transition-all duration-500 flex flex-col justify-between group overflow-hidden shadow-2xl",
                    plan.popular
                      ? "border-cyan-500/50 lg:-translate-y-2"
                      : "border-slate-800/80 hover:border-slate-700",
                  ]}
                  style={{ "--glow-color": plan.glowColor }}
                >
                  {/* Top Gradient Highlight Bar */}
                  <div
                    class={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${plan.accent}`}
                  />

                  <div>
                    {/* Badge & Title */}
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-2xl font-extrabold text-white">
                        {plan.name}
                      </h3>
                      <span
                        class={[
                          "px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border",
                          plan.popular
                            ? "bg-cyan-950 text-cyan-300 border-cyan-800/80"
                            : "bg-slate-950 text-slate-400 border-slate-800",
                        ]}
                      >
                        {plan.badge}
                      </span>
                    </div>

                    <p class="text-xs text-slate-400 min-h-[36px] leading-relaxed">
                      {plan.desc}
                    </p>

                    {/* Price */}
                    <div class="my-8 flex items-baseline space-x-2">
                      <span class="text-5xl font-black tracking-tight text-white transition-all">
                        ${price}
                      </span>
                      <span class="text-slate-400 text-sm font-medium">
                        / month {isYearly.value && "(billed annually)"}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      class={[
                        "w-full py-3.5 px-6 rounded-xl font-bold transition-all duration-300 cursor-pointer text-center text-sm active:scale-[0.98]",
                        plan.ctaClass,
                      ]}
                    >
                      {plan.ctaText}
                    </button>

                    {/* Divider */}
                    <div class="my-8 border-t border-slate-800/80" />

                    {/* Features List */}
                    <div class="space-y-3.5">
                      <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        Included Features:
                      </p>
                      <ul class="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            class="pricing-feature-item flex items-center space-x-3 text-slate-300 text-xs sm:text-sm font-medium"
                          >
                            <div class="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0">
                              <svg
                                class="w-2.5 h-2.5 text-cyan-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p class="text-center text-[11px] text-slate-500 mt-8 pt-4 border-t border-slate-800/40">
                    14-day free trial • Cancel anytime
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  },
});
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./pricing.css";

gsap.registerPlugin(ScrollTrigger);

const planFeatures = [
  "Up to 5 Autonomous Micro-Agents",
  "Sub-millisecond Real-Time Synthesis",
  "100,000 API Executions / month",
  "Self-Healing Infrastructure Loops",
  "Standard Enterprise Encrypted Perimeter",
  "24/7 Priority Discord & Email Support",
];

export default defineComponent({
  name: "Pricing",

  setup() {
    const sectionRef = ref(null);
    const cardRef = ref(null);
    const isYearly = ref(false);
    let ctx = null;

    const toggleBilling = () => {
      isYearly.value = !isYearly.value;
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

        // 2. Entrance animation for the pricing card
        if (cardRef.value) {
          gsap.fromTo(
            cardRef.value,
            {
              autoAlpha: 0,
              y: 60,
              scale: 0.92,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardRef.value,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 3. Staggered feature list checkmark entrance
        gsap.fromTo(
          ".pricing-feature-item",
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.value,
              start: "top 75%",
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
        {/* Background Ambient Glows */}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 blur-[170px] rounded-full pointer-events-none" />
        <div class="absolute bottom-10 right-1/3 w-[450px] h-[450px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none" />

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div class="pricing-header text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/60 text-cyan-300 text-xs font-bold tracking-widest uppercase">
              Flexible Pricing
            </span>
            <h2 class="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Simple, Transparent Plans
            </h2>
            <p class="text-slate-400 text-lg leading-relaxed">
              Scale your autonomous AI operations with zero hidden overhead. Upgrade or cancel anytime.
            </p>

            {/* Monthly / Yearly Billing Toggle */}
            <div class="pt-6 flex items-center justify-center space-x-4">
              <span
                class={`text-sm font-semibold ${
                  !isYearly.value ? "text-cyan-300" : "text-slate-400"
                }`}
              >
                Monthly
              </span>
              <button
                type="button"
                onClick={toggleBilling}
                class="relative w-14 h-8 flex items-center rounded-full bg-slate-800 p-1 border border-slate-700 cursor-pointer focus:outline-none"
              >
                <div
                  class={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md transform transition-transform duration-300 ${
                    isYearly.value ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                class={`text-sm font-semibold flex items-center space-x-2 ${
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

          {/* Single Highlighted Pricing Card */}
          <div class="max-w-xl mx-auto">
            <div
              ref={cardRef}
              class="pricing-card relative p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl overflow-hidden group"
            >
              {/* Top Gradient Highlight Bar */}
              <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400" />

              {/* Top Badge */}
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
                    Starter Pro
                  </h3>
                  <p class="text-xs text-slate-400 mt-1">
                    Ideal for scaling startups and modern dev teams.
                  </p>
                </div>
                <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 tracking-wider uppercase">
                  Most Popular
                </span>
              </div>

              {/* Price Display */}
              <div class="my-8 flex items-baseline space-x-2">
                <span class="text-5xl sm:text-6xl font-black tracking-tight text-white">
                  {isYearly.value ? "$79" : "$99"}
                </span>
                <span class="text-slate-400 font-medium text-lg">
                  / month {isYearly.value && "(billed annually)"}
                </span>
              </div>

              {/* Primary CTA Button */}
              <button
                type="button"
                class="relative w-full py-4 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 hover:opacity-95 transition-all duration-300 shadow-lg shadow-cyan-500/20 active:scale-[0.98] cursor-pointer text-center text-base tracking-wide"
              >
                Get Started Now
              </button>

              <p class="text-center text-xs text-slate-500 mt-3">
                14-day free trial • No credit card required
              </p>

              {/* Feature List Divider */}
              <div class="my-8 border-t border-slate-800/80" />

              {/* Features List */}
              <div class="space-y-4">
                <p class="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Included Features:
                </p>
                <ul class="space-y-3.5">
                  {planFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      class="pricing-feature-item flex items-center space-x-3 text-slate-200 text-sm font-medium"
                    >
                      <div class="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0">
                        <svg
                          class="w-3 h-3 text-cyan-400"
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
          </div>
        </div>
      </section>
    );
  },
});
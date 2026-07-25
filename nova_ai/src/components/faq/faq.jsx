import { defineComponent, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./faq.css";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: "q1",
    question: "How do Nova AI autonomous agents handle complex multi-step workflows?",
    answer:
      "Nova AI utilizes a dynamic Neural Graph architecture. Agents split high-level objectives into sub-tasks, execute them asynchronously across independent runtime environments, and self-correct if edge cases or API exceptions occur.",
  },
  {
    id: "q2",
    question: "Can I deploy agents into air-gapped or local VPC infrastructure?",
    answer:
      "Yes! Our Enterprise tier provides complete support for private perimeter deployments, including custom model meshes, localized vector stores, and zero external egress network policies.",
  },
  {
    id: "q3",
    question: "What happens if an agent loop exceeds its allocated API execution limit?",
    answer:
      "You can set hard circuit-breakers and soft safety guardrails per workspace. When a threshold is approached, Nova AI sends immediate webhook alerts and can either request human-in-the-loop approval or automatically pause the execution thread.",
  },
  {
    id: "q4",
    question: "How does billing work when switching between Monthly and Yearly plans?",
    answer:
      "Upgrades take effect immediately with pro-rated billing. When switching from Monthly to Yearly, your remaining monthly balance is automatically credited toward your new annual plan.",
  },
  {
    id: "q5",
    question: "Do you offer custom SLAs and dedicated Solutions Engineering?",
    answer:
      "Dedicated Solutions Architects and guaranteed 99.99% uptime SLAs are standard on the Enterprise plan. We also provide custom onboarding workshops and direct Slack/Discord channels with our core engineering team.",
  },
];

export default defineComponent({
  name: "FAQ",

  setup() {
    const sectionRef = ref(null);
    const activeIndex = ref(null);
    const contentRefs = ref({});
    const iconRefs = ref({});
    let ctx = null;

    // Toggle FAQ item with smooth GSAP height animation
    const toggleFaq = (index) => {
      const isOpening = activeIndex.value !== index;
      const prevIndex = activeIndex.value;

      // Close previously open item if any
      if (prevIndex !== null && contentRefs.value[prevIndex]) {
        const prevContent = contentRefs.value[prevIndex];
        const prevIcon = iconRefs.value[prevIndex];

        gsap.to(prevContent, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });

        gsap.to(prevIcon, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Open newly clicked item
      if (isOpening) {
        activeIndex.value = index;

        nextTick(() => {
          const content = contentRefs.value[index];
          const icon = iconRefs.value[index];

          if (content) {
            gsap.fromTo(
              content,
              { height: 0, opacity: 0 },
              {
                height: "auto",
                opacity: 1,
                duration: 0.45,
                ease: "power3.out",
              }
            );
          }

          if (icon) {
            gsap.to(icon, {
              rotate: 135, // Smooth turn into an "X" or close state
              duration: 0.35,
              ease: "back.out(1.7)",
            });
          }
        });
      } else {
        activeIndex.value = null;
      }
    };

    onMounted(() => {
      const container = sectionRef.value;
      if (!container) return;

      ctx = gsap.context(() => {
        // Entrance animation for header
        gsap.fromTo(
          ".faq-header",
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

        // Staggered entrance for FAQ cards
        const items = gsap.utils.toArray(".faq-item", container);
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
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
        id="faq"
        class="relative w-full py-28 bg-slate-950 overflow-hidden text-white"
      >
        {/* Ambient Glows */}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div class="absolute bottom-10 left-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div class="max-w-4xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div class="faq-header text-center space-y-4 mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full border border-purple-400/30 bg-purple-950/60 text-purple-300 text-xs font-bold tracking-widest uppercase">
              Got Questions?
            </span>
            <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about Nova AI autonomous infrastructure, security, and scaling options.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div class="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex.value === index;

              return (
                <div
                  key={faq.id}
                  class={[
                    "faq-item rounded-2xl border transition-colors duration-300 overflow-hidden backdrop-blur-xl",
                    isOpen
                      ? "bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5"
                      : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80",
                  ]}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    class="w-full py-6 px-6 sm:px-8 flex items-center justify-between text-left cursor-pointer focus:outline-none select-none group"
                    aria-expanded={isOpen}
                  >
                    <span
                      class={[
                        "text-base sm:text-lg font-bold transition-colors duration-300 pr-4",
                        isOpen
                          ? "text-cyan-300"
                          : "text-slate-200 group-hover:text-white",
                      ]}
                    >
                      {faq.question}
                    </span>

                    {/* Plus / Cross Icon Indicator */}
                    <div
                      ref={(el) => (iconRefs.value[index] = el)}
                      class={[
                        "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300",
                        isOpen
                          ? "bg-cyan-950 border-cyan-500/50 text-cyan-300"
                          : "bg-slate-800/80 border-slate-700/60 text-slate-400 group-hover:text-white group-hover:border-slate-600",
                      ]}
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.5"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Collapsible Answer Panel */}
                  <div
                    ref={(el) => (contentRefs.value[index] = el)}
                    class="h-0 opacity-0 overflow-hidden px-6 sm:px-8"
                  >
                    <p class="pb-6 text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support Banner */}
          <div class="mt-14 text-center p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 text-slate-400 text-sm">
            Have a question that isn't answered here?{" "}
            <a
              href="#contact"
              class="text-cyan-400 font-semibold hover:underline underline-offset-4 transition-all"
            >
              Reach out to our engineering team →
            </a>
          </div>
        </div>
      </section>
    );
  },
});
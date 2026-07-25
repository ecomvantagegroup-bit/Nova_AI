import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./testimonials.css";

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: "1",
    name: "Elena Rostova",
    role: "VP of Engineering",
    company: "Aether Dynamics",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    review:
      "Nova AI reduced our cloud infrastructure failover response time from 12 minutes to sub-milliseconds. The autonomous agent orchestration feels like magic.",
    glowColor: "rgba(6, 182, 212, 0.25)", // Cyan glow
    badge: "Enterprise User",
  },
  {
    id: "2",
    name: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Synthetix Cloud",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    review:
      "Integrating Nova AI into our DevOps pipeline eliminated 90% of manual incident responses. It’s easily the most impactful AI tool we’ve adopted this decade.",
    glowColor: "rgba(168, 85, 247, 0.25)", // Purple glow
    badge: "Verified Buyer",
  },
  {
    id: "3",
    name: "Sarah Chen",
    role: "Head of Infrastructure",
    company: "OmniGrid Systems",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    review:
      "The private perimeter and air-gapped setup made compliance effortless. Our engineering team gained back hundreds of hours every quarter.",
    glowColor: "rgba(52, 211, 153, 0.25)", // Emerald glow
    badge: "Power User",
  },
  {
    id: "4",
    name: "David Kouris",
    role: "Lead Systems Architect",
    company: "Vortex Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    review:
      "The multi-agent coordination capabilities are unmatched. Nova AI autonomously identifies pipeline bottlenecks before our monitoring alerts even fire.",
    glowColor: "rgba(236, 72, 153, 0.25)", // Pink glow
    badge: "Enterprise User",
  },
];

export default defineComponent({
  name: "Testimonials",

  setup() {
    const sectionRef = ref(null);
    let ctx = null;

    const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          class={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-slate-700 fill-slate-700"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
    };

    onMounted(() => {
      const container = sectionRef.value;
      if (!container) return;

      ctx = gsap.context(() => {
        // --- Entrance animation for header ---
        gsap.fromTo(
          ".testimonials-header",
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

        // --- Staggered card appearance ---
        const cards = gsap.utils.toArray(".testimonial-card", container);
        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 50,
            scale: 0.95,
          },
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
        id="testimonials"
        class="relative w-full py-28 bg-slate-950 overflow-hidden text-white"
      >
        {/* Background Ambient Glows */}
        <div class="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div class="testimonials-header text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/60 text-cyan-300 text-xs font-bold tracking-widest uppercase">
              Client Feedback
            </span>
            <h2 class="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Trusted by Engineering Leaders
            </h2>
            <p class="text-slate-400 text-lg leading-relaxed">
              Discover how global tech teams scale operational efficiency and eliminate downtime with Nova AI.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                class="testimonial-card relative p-8 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 transition-all duration-500 flex flex-col justify-between overflow-hidden group shadow-2xl"
                style={{ "--glow-color": item.glowColor }}
              >
                {/* Background Hover Glow */}
                <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Row: Stars & Badge */}
                  <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-1">
                      {renderStars(item.rating)}
                    </div>
                    <span class="text-[11px] font-semibold text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800/80">
                      {item.badge}
                    </span>
                  </div>

                  {/* Review Quote */}
                  <blockquote class="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 italic relative z-10">
                    &ldquo;{item.review}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div class="flex items-center space-x-4 pt-6 border-t border-slate-800/60 relative z-10">
                  <div class="relative">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      class="w-12 h-12 rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition-colors duration-300"
                    />
                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <span class="block w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>

                  <div>
                    <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h3>
                    <p class="text-xs text-slate-400 font-medium">
                      {item.role} <span class="text-cyan-500">@</span>{" "}
                      <span class="text-slate-300">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
});
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contacts.css";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: "Contacts",

  setup() {
    const sectionRef = ref(null);
    const formSubmitted = ref(false);
    const isSubmitting = ref(false);
    let ctx = null;

    const formData = ref({
      name: "",
      email: "",
      workspaceType: "Engineering Team",
      message: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      isSubmitting.value = true;

      // Simulate API submission delay
      setTimeout(() => {
        isSubmitting.value = false;
        formSubmitted.value = true;

        // Animate success message
        gsap.fromTo(
          ".success-message",
          { autoAlpha: 0, scale: 0.9, y: 15 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }, 1000);
    };

    onMounted(() => {
      const container = sectionRef.value;
      if (!container) return;

      ctx = gsap.context(() => {
        // 1. Entrance animation for Left Side (Company Info & CTA)
        gsap.fromTo(
          ".contact-info-col",
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 2. Entrance animation for Right Side (Form Card)
        gsap.fromTo(
          ".contact-form-col",
          { autoAlpha: 0, x: 50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
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
        id="contacts"
        class="relative w-full py-28 bg-slate-950 overflow-hidden text-white"
      >
        {/* Ambient Glow Effects */}
        <div class="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
        <div class="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          {/* Main 2-Column Grid */}
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Company Info & CTA */}
            <div class="contact-info-col lg:col-span-5 space-y-10">
              <div class="space-y-4">
                <span class="inline-block px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/60 text-cyan-300 text-xs font-bold tracking-widest uppercase">
                  Get In Touch
                </span>
                <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
                  Accelerate Your Autonomous Workflows
                </h2>
                <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
                  Have questions about private mesh deployments, custom agent throughput, or tailored enterprise SLAs? Our core team is ready.
                </p>
              </div>

              {/* Company Info Cards */}
              <div class="space-y-6">
                <div class="flex items-start space-x-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md">
                  <div class="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-slate-200">Headquarters</h4>
                    <p class="text-xs sm:text-sm text-slate-400">548 Market St, Suite 9000, San Francisco, CA 94104</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md">
                  <div class="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center shrink-0 text-purple-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-slate-200">Direct Contact</h4>
                    <p class="text-xs sm:text-sm text-slate-400">sales@nova-ai.io • support@nova-ai.io</p>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Mini Banner */}
              <div class="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 relative overflow-hidden group">
                <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                <h4 class="text-lg font-bold text-white mb-2">Ready to deploy today?</h4>
                <p class="text-xs text-slate-400 mb-4">Spin up your first 2 autonomous agents in under 3 minutes with our free trial tier.</p>
                <a
                  href="#pricing"
                  class="inline-flex items-center space-x-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Self-Serve Plans</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div class="contact-form-col lg:col-span-7">
              <div class="relative p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl">
                <h3 class="text-2xl font-extrabold text-white mb-2">Send Us a Message</h3>
                <p class="text-xs sm:text-sm text-slate-400 mb-8">Fill out the form below and an engineer will respond within 2 hours.</p>

                {formSubmitted.value ? (
                  <div class="success-message text-center py-12 space-y-4">
                    <div class="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/20">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 class="text-2xl font-bold text-white">Message Dispatched!</h4>
                    <p class="text-sm text-slate-400 max-w-md mx-auto">
                      Thank you for reaching out. A Nova AI solutions specialist has been assigned to your query.
                    </p>
                    <button
                      type="button"
                      onClick={() => (formSubmitted.value = false)}
                      class="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div class="space-y-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Sarah Connor"
                          v-model={formData.value.name}
                          class="contact-input w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      {/* Email Input */}
                      <div class="space-y-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@techcorp.com"
                          v-model={formData.value.email}
                          class="contact-input w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Workspace Type Selector */}
                    <div class="space-y-2">
                      <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Primary Use Case / Team
                      </label>
                      <select
                        v-model={formData.value.workspaceType}
                        class="contact-input w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                      >
                        <option value="Engineering Team">Engineering & DevOps Team</option>
                        <option value="Enterprise Security">Enterprise / Air-Gapped Security</option>
                        <option value="Startup / Indie">Fast-Growing Startup</option>
                        <option value="Other">Partnership or Other</option>
                      </select>
                    </div>

                    {/* Message Input */}
                    <div class="space-y-2">
                      <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        How Can We Help?
                      </label>
                      <textarea
                        rows="4"
                        required
                        placeholder="Tell us about your expected agent concurrency, latency goals, or security requirements..."
                        v-model={formData.value.message}
                        class="contact-input w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting.value}
                      class="w-full py-4 px-8 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] cursor-pointer flex items-center justify-center space-x-2"
                    >
                      {isSubmitting.value ? (
                        <div class="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  },
});
import { defineComponent, ref } from "vue";

import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";
import AboutStory from "./components/about/AboutStory";
import Workflow from "./components/workflow/Workflow";
import Testimonials from "./components/testimonials/Testimonials";
import Pricing from "./components/pricing/Pricing";
import Faq from "./components/faq/faq";

export default defineComponent({
  name: "App",

  setup() {
    const mainRef = ref(null);

    return () => (
      <div
        ref={mainRef}
        class="relative w-full min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950"
      >
        <header class="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </header>

        <main class="relative w-full pt-20">
          <section id="hero" class="relative w-full">
            <Hero />
          </section>

          <section id="features" class="relative w-full bg-slate-950">
            <Features />
          </section>

          <section id="about" class="relative w-full bg-slate-950">
            <AboutStory />
          </section>

          <section id="workflow" class="relative w-full bg-slate-950">
            <Workflow />
          </section>

          <section id="testimonials" class="relative w-full bg-slate-950">
            <Testimonials />
          </section>

          <section id="pricing" class="relative w-full bg-slate-950">
            <Pricing />
          </section>
          
          <section id="faq" class="relative w-full bg-slate-950">
            <Faq />
          </section>

          <section
            id="contact"
            class="relative w-full min-h-screen flex items-center justify-center bg-slate-950 border-t border-slate-800/50 py-24"
          >
            <div class="max-w-xl text-center space-y-6 px-6">
              <span class="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/40 rounded-full">
                Get In Touch
              </span>

              <h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Start Your Next Project
              </h1>

              <p class="text-slate-400 text-lg leading-relaxed">
                Ready to automate your workflows? Let&apos;s discuss how Nova AI can
                integrate with your tech stack.
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  },
});
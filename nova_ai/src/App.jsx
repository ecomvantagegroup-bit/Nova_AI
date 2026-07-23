import { defineComponent, ref } from "vue";

import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";

export default defineComponent({
  name: "App",

  setup() {
    const mainRef = ref(null);

    return () => (
      <div
        ref={mainRef}
        class="relative w-full overflow-x-hidden bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950"
      >
        {/* Navbar stays fixed above all content */}
        <Navbar />

        {/* Section 1: Hero */}
        <section class="page-section relative min-h-screen">
          <Hero />
        </section>

        {/* Section 2: Features */}
        <section class="page-section relative min-h-screen bg-slate-950">
          <Features />
        </section>

        {/* Section 3: About */}
        <section
          id="about"
          class="page-section relative min-h-screen flex items-center justify-center bg-slate-900 border-t border-slate-800/50"
        >
          <div class="max-w-3xl text-center space-y-6 px-6">
            <span class="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/40 rounded-full">
              Our Vision
            </span>
            <h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              About Nova AI
            </h1>
            <p class="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Nova AI designs intelligent applications, autonomous agents, and scalable enterprise
              AI solutions that automate workflows and accelerate growth.
            </p>
          </div>
        </section>

        {/* Section 4: Contact */}
        <section
          id="contact"
          class="page-section relative min-h-screen flex items-center justify-center bg-slate-950 border-t border-slate-800/50"
        >
          <div class="max-w-xl text-center space-y-6 px-6">
            <span class="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/40 rounded-full">
              Get In Touch
            </span>
            <h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Start Your Next Project
            </h1>
            <p class="text-slate-400 text-lg leading-relaxed">
              Ready to automate your workflows? Let's discuss how Nova AI can integrate with your tech stack.
            </p>
          </div>
        </section>
      </div>
    );
  },
});
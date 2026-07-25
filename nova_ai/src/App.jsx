import { defineComponent, ref } from "vue";

import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";
import AboutStory from "./components/about/AboutStory";
import Workflow from "./components/workflow/Workflow";
import Testimonials from "./components/testimonials/Testimonials";
import Pricing from "./components/pricing/Pricing";
import Faq from "./components/faq/faq";
import Contact from "./components/contacts/contacts";
import Footer from "./components/footer/footer";

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
            <Contact />
          </section>
          <footer id="footer" class="relative w-full bg-slate-950 border-t border-slate-800/50">
            <Footer />
          </footer>
        </main>
      </div>
    );
  },
});
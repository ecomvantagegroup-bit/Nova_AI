import { defineComponent } from "vue";

import Navbar from "./components/navbar/navbar.jsx";
import Hero from "./components/hero/hero.jsx";
import Features from "./components/features/features.jsx";
import AboutStory from "./components/about/aboutstory.jsx";
import Workflow from "./components/workflow/workflow.jsx";
import Testimonials from "./components/testimonials/testimonials.jsx";
import Pricing from "./components/pricing/pricing.jsx";
import Faq from "./components/faq/faq/-,jsx";
import Contact from "./components/contacts/contacts.jsx";
import Footer from "./components/footer/footer.jsx";

export default defineComponent({
  name: "App",

  setup() {
    return () => (
      <div class="relative w-full min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
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

import { defineComponent } from "vue";

export default defineComponent({
  name: "Hero",

  setup() {
    const scrollToSection = (id) => {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    return () => (
      <section
        id="hero"
        class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
      >
        {/* Background Overlay */}
        <div class="absolute inset-0 bg-black/40"></div>

        {/* Optional Animated Background */}
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb33,transparent_40%),radial-gradient(circle_at_bottom_left,#7c3aed33,transparent_40%)]"></div>

        {/* Hero Content */}
        <div class="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">

          <span class="inline-block rounded-full border border-blue-400 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300">
            🚀 Welcome to Nova AI
          </span>

          <h1 class="mt-8 text-5xl font-extrabold leading-tight md:text-4xl">
            Build Modern
            <span class="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Artificial Intelligence, Engineered for Impact.
            </span>
          </h1>

          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            We build intelligent AI systems, autonomous agents, and scalable solutions that help businesses innovate, automate, and grow.
          </p>

          <div class="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <button
              onClick={() => scrollToSection("about")}
              class="rounded-xl bg-blue-600 px-8 py-4 font-semibold shadow-lg transition hover:scale-105 hover:bg-blue-700"
            >
              Get Started
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              class="rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-slate-900"
            >
              Contact Us
            </button>

          </div>

        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("about")}
          class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-4xl text-white hover:text-blue-400 transition"
        >
          ↓
        </button>

      </section>
    );
  },
});
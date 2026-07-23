import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";

export default {
  name: "App",

  render() {
    return (
      <>
        <Navbar />

        <Hero />

        <Features />

        <section
          id="about"
          class="min-h-screen flex items-center justify-center bg-white"
        >
          <h1 class="text-5xl font-bold">About</h1>
        </section>

        <section
          id="services"
          class="min-h-screen flex items-center justify-center bg-slate-100"
        >
          <h1 class="text-5xl font-bold">Services</h1>
        </section>

        <section
          id="contact"
          class="min-h-screen flex items-center justify-center bg-white"
        >
          <h1 class="text-5xl font-bold">Contact</h1>
        </section>
      </>
    );
  },
};
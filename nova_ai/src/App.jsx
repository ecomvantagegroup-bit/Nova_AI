import Navbar from "./components/Navbar";

export default {
  name: "App",

  render() {
    return (
      <>
        <Navbar />

        <section
          id="home"
          class="min-h-screen flex items-center justify-center bg-slate-100"
        >
          <h1 class="text-5xl font-bold">Home</h1>
        </section>

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
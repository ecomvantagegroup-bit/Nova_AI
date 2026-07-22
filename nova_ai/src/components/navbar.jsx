import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "Navbar",

  setup() {
    const mobileOpen = ref(false);
    const scrolled = ref(false);

    const links = [
      { name: "Home", id: "home" },
      { name: "About", id: "about" },
      { name: "Services", id: "services" },
      { name: "Contact", id: "contact" },
    ];

    const handleScroll = () => {
      scrolled.value = window.scrollY > 50;
    };

    const scrollTo = (id) => {
      mobileOpen.value = false;

      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return () => (
      <header
        class={[
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled.value
            ? "bg-white/70 backdrop-blur-lg shadow-md"
            : "bg-transparent",
        ]}
      >
        <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <h1 class="text-2xl font-bold text-blue-600">
            VueJS
          </h1>

          {/* Desktop Menu */}
          <ul class="hidden md:flex items-center gap-8 font-medium">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  class="hover:text-blue-600 transition"
                  onClick={() => scrollTo(link.id)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            class="md:hidden text-3xl"
            onClick={() => (mobileOpen.value = !mobileOpen.value)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen.value && (
          <div class="md:hidden bg-white shadow-lg">
            {links.map((link) => (
              <button
                key={link.id}
                class="block w-full text-left px-6 py-4 border-b hover:bg-gray-100"
                onClick={() => scrollTo(link.id)}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </header>
    );
  },
});
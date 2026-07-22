import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import "./navbar.css";

export default defineComponent({
  name: "Navbar",

  setup() {
    const mobileOpen = ref(false);
    const scrolled = ref(false);

    const links = [
      { name: "Home", id: "hero" },
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
          "navbar",
          scrolled.value ? "navbar-scrolled" : "navbar-transparent",
        ]}
      >
        <nav class="navbar-container">
          <h1 class="navbar-logo">Nova AI</h1>

          {/* Desktop Menu */}
          <ul class="navbar-menu">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  class="navbar-link"
                  onClick={() => scrollTo(link.id)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            class="navbar-mobile-btn"
            onClick={() => (mobileOpen.value = !mobileOpen.value)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen.value && (
          <div class="navbar-mobile-menu">
            {links.map((link) => (
              <button
                key={link.id}
                class="navbar-mobile-link"
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
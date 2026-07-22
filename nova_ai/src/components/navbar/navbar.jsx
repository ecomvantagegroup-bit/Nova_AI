import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import "./navbar.css";

export default defineComponent({
  name: "Navbar",

  setup() {
    const mobileOpen = ref(false);
    const scrolled = ref(false);
    const showNavbar = ref(false);

    const links = [
      { name: "Home", id: "hero" },
      { name: "About", id: "about" },
      { name: "Services", id: "services" },
      { name: "Contact", id: "contact" },
    ];

    const handleScroll = () => {
      scrolled.value = window.scrollY > 50;

      // Keep navbar visible once user scrolls
      if (window.scrollY > 10) {
        showNavbar.value = true;
      } else {
        showNavbar.value = false;
      }
    };

    const handleMouseMove = (e) => {
      // Only reveal at top of page
      if (window.scrollY === 0) {
        showNavbar.value = e.clientY <= 20;
      }
    };

    const scrollTo = (id) => {
      mobileOpen.value = false;

      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => (
      <header
        class={[
          "navbar",
          showNavbar.value ? "navbar-visible" : "navbar-hidden",
          scrolled.value ? "navbar-scrolled" : "navbar-transparent",
        ]}
      >
        <nav class="navbar-container">
          <h1 class="navbar-logo">Nova AI</h1>

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

          <button
            class="navbar-mobile-btn"
            onClick={() => (mobileOpen.value = !mobileOpen.value)}
          >
            ☰
          </button>
        </nav>

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
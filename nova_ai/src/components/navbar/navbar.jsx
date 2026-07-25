import { defineComponent, ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import "./navbar.css";

export default defineComponent({
  name: "Navbar",

  setup() {
    const mobileOpen = ref(false);
    const scrolled = ref(false);

    const navbarRef = ref(null);
    const logoRef = ref(null);
    const menuRef = ref(null);
    const mobileMenuRef = ref(null);
    const mobileBtnRef = ref(null);

    const links = [
      { name: "Home", id: "hero" },
      { name: "Services", id: "features" },
      { name: "About", id: "about" },
      { name: "Contact", id: "contact" },
    ];

    const scrollTo = (id) => {
      mobileOpen.value = false;

      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });

      if (mobileMenuRef.value) {
        gsap.to(mobileMenuRef.value, {
          opacity: 0,
          y: -20,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    };

    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;

      if (isScrolled !== scrolled.value) {
        scrolled.value = isScrolled;

        gsap.to(navbarRef.value, {
          duration: 0.35,
          ease: "power2.out",
          scale: isScrolled ? 0.98 : 1,
        });
      }
    };

    const toggleMobileMenu = async () => {
      mobileOpen.value = !mobileOpen.value;

      await nextTick();

      if (mobileOpen.value) {
        gsap.fromTo(
          mobileMenuRef.value,
          {
            opacity: 0,
            y: -30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
          }
        );

        gsap.from(".navbar-mobile-link", {
          opacity: 0,
          x: -25,
          stagger: 0.08,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileMenuRef.value, {
          opacity: 0,
          y: -20,
          duration: 0.25,
        });
      }
    };

    const hoverIn = (e) => {
      gsap.to(e.currentTarget, {
        y: -3,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const hoverOut = (e) => {
      gsap.to(e.currentTarget, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(navbarRef.value, {
        y: -80,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          logoRef.value,
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.8)",
          },
          "-=0.45"
        )
        .from(
          menuRef.value.children,
          {
            opacity: 0,
            y: -20,
            stagger: 0.08,
            duration: 0.45,
          },
          "-=0.35"
        )
        .from(
          mobileBtnRef.value,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.4,
          },
          "-=0.4"
        );

      gsap.to(logoRef.value, {
        backgroundPosition: "200% center",
        repeat: -1,
        duration: 5,
        ease: "none",
      });
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return () => (
      <header
        ref={navbarRef}
        class={[
          "navbar",
          scrolled.value ? "navbar-scrolled" : "navbar-transparent",
        ]}
      >
        <nav class="navbar-container">
          <h1 ref={logoRef} class="navbar-logo">
            Nova AI
          </h1>

          <ul ref={menuRef} class="navbar-menu">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  class="navbar-link"
                  onMouseenter={hoverIn}
                  onMouseleave={hoverOut}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          <div class="navbar-actions">
            <button class="navbar-cta">
              Get Started
            </button>

            <button
              ref={mobileBtnRef}
              class="navbar-mobile-btn"
              onClick={toggleMobileMenu}
            >
              {mobileOpen.value ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {mobileOpen.value && (
          <div
            ref={mobileMenuRef}
            class="navbar-mobile-menu"
          >
            {links.map((link) => (
              <button
                key={link.id}
                class="navbar-mobile-link"
                onClick={() => scrollTo(link.id)}
              >
                {link.name}
              </button>
            ))}

            <button class="navbar-mobile-cta">
              Get Started
            </button>
          </div>
        )}
      </header>
    );
  },
});
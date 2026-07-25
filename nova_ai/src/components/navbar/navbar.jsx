import { defineComponent, ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";

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
      const isScrolled = window.scrollY > 50;

      if (isScrolled !== scrolled.value) {
        scrolled.value = isScrolled;

        if (isScrolled) {
          // Reveal navbar on scroll down
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(navbarRef.value, {
            y: 0,
            xPercent: 0,
            opacity: 1,
            duration: 0.6,
          })
            .fromTo(
              logoRef.value,
              { scale: 0.7, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
              "-=0.3"
            )
            .fromTo(
              menuRef.value ? menuRef.value.children : [],
              { opacity: 0, y: -15 },
              { opacity: 1, y: 0, stagger: 0.06, duration: 0.35 },
              "-=0.25"
            );
        } else {
          // Hide navbar when back at the top
          gsap.to(navbarRef.value, {
            y: -100,
            xPercent: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          });

          if (mobileOpen.value) {
            mobileOpen.value = false;
          }
        }
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
            y: -20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          }
        );

        gsap.from(".navbar-mobile-link", {
          opacity: 0,
          x: -20,
          stagger: 0.06,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileMenuRef.value, {
          opacity: 0,
          y: -15,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    };

    const hoverIn = (e) => {
      gsap.to(e.currentTarget, {
        y: -2,
        color: "#a78bfa",
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const hoverOut = (e) => {
      gsap.to(e.currentTarget, {
        y: 0,
        color: "#e2e8f0",
        duration: 0.2,
        ease: "power2.out",
      });
    };

    onMounted(() => {
      // Hide initially off-screen
      gsap.set(navbarRef.value, {
        y: -100,
        xPercent: 0,
        opacity: 0,
      });

      // Animated gradient text background loop
      gsap.to(logoRef.value, {
        backgroundPosition: "200% center",
        repeat: -1,
        duration: 6,
        ease: "none",
      });

      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return () => (
      <header
        ref={navbarRef}
        class="fixed top-3 md:top-4 inset-x-0 mx-auto z-50 w-[95%] max-w-7xl transition-all duration-300"
      >
        <nav
          class="flex items-center justify-between rounded-full px-6 py-3.5 md:px-8 md:py-4 backdrop-blur-xl"
          style={{
            background: "rgba(15, 23, 42, 0.78)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow:
              "0 20px 50px rgba(15, 23, 42, 0.5), 0 0 25px rgba(99, 102, 241, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Animated Gradient Logo */}
          <h1
            ref={logoRef}
            onClick={() => scrollTo("hero")}
            class="cursor-pointer text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
              backgroundSize: "250% auto",
            }}
          >
            Nova AI
          </h1>

          {/* Desktop Menu */}
          <ul ref={menuRef} class="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  class="relative text-sm font-medium text-slate-200 transition-colors duration-300 hover:text-purple-300"
                  onMouseenter={hoverIn}
                  onMouseleave={hoverOut}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions / CTA */}
          <div class="flex items-center gap-4">
            <button
              class="hidden md:block rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
              }}
              onClick={() => scrollTo("pricing")}
            >
              Get Started
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              ref={mobileBtnRef}
              class="block md:hidden text-2xl text-slate-100 transition-transform duration-300 hover:rotate-90"
              onClick={toggleMobileMenu}
            >
              {mobileOpen.value ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileOpen.value && (
          <div
            ref={mobileMenuRef}
            class="mt-3 rounded-3xl overflow-hidden backdrop-blur-2xl p-2"
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              boxShadow: "0 20px 50px rgba(2, 6, 23, 0.7)",
            }}
          >
            {links.map((link) => (
              <button
                key={link.id}
                class="navbar-mobile-link w-full text-left px-6 py-4 text-sm font-medium text-slate-300 border-b border-slate-800/60 transition-all duration-300 hover:bg-purple-900/30 hover:text-purple-300 hover:pl-8"
                onClick={() => scrollTo(link.id)}
              >
                {link.name}
              </button>
            ))}

            <button
              class="w-[calc(100%-2rem)] m-4 py-3 rounded-full text-center font-semibold text-white text-sm transition-transform duration-300 active:scale-95"
              style={{
                background:

                "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
              }}

              onClick={() => scrollTo("pricing")}
            >
              Get Started
            </button>
          </div>
        )}
      </header>
    );
  },
});
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./footer.css";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: "Footer",

  setup() {
    const footerRef = ref(null);
    let ctx = null;

    const currentYear = new Date().getFullYear();

    const navLinks = {
      product: [
        { name: "Features", href: "#features" },
        { name: "Autonomous Agents", href: "#agents" },
        { name: "Architecture", href: "#architecture" },
        { name: "Pricing", href: "#pricing" },
        { name: "Changelog", href: "#changelog" },
      ],
      resources: [
        { name: "Documentation", href: "#docs" },
        { name: "API Reference", href: "#api" },
        { name: "Community Discord", href: "#discord" },
        { name: "Status Page", href: "#status" },
        { name: "System Metrics", href: "#metrics" },
      ],
      company: [
        { name: "About Nova AI", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Security & Trust", href: "#security" },
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
      ],
    };

    const socialLinks = [
      {
        name: "GitHub",
        href: "https://github.com",
        icon: (
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        ),
      },
      {
        name: "X (Twitter)",
        href: "https://twitter.com",
        icon: (
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        ),
      },
      {
        name: "Discord",
        href: "https://discord.com",
        icon: (
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        ),
      },
    ];

    onMounted(() => {
      const container = footerRef.value;
      if (!container) return;

      ctx = gsap.context(() => {
        // Entrance animation sequence
        gsap.fromTo(
          ".footer-anim",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, container);
    });

    onBeforeUnmount(() => {
      ctx?.revert();
    });

    return () => (
      <footer
        ref={footerRef}
        id="footer"
        class="relative w-full pt-20 pb-12 bg-slate-950 border-t border-slate-900 text-white overflow-hidden"
      >
        {/* Ambient Glow Effects */}
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-purple-600/10 via-cyan-500/5 to-transparent blur-[150px] pointer-events-none" />

        <div class="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          {/* Main Footer Content Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Logo & Brand Bio Column */}
            <div class="footer-anim lg:col-span-2 space-y-6">
              <a href="#" class="inline-flex items-center space-x-3 group">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                  <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                    <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xl">
                      N
                    </span>
                  </div>
                </div>
                <span class="text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Nova<span class="text-cyan-400">.AI</span>
                </span>
              </a>

              <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
                Next-generation autonomous agent orchestration platform. Build, deploy, and scale resilient AI workflows in secure private environments.
              </p>

              {/* Operational Status Pill */}
              <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span class="font-medium">All Autonomous Nodes Operational</span>
              </div>
            </div>

            {/* Nav Links Column: Product */}
            <div class="footer-anim space-y-4">
              <h4 class="text-xs font-bold uppercase tracking-widest text-slate-200">
                Product
              </h4>
              <ul class="space-y-2.5">
                {navLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      class="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav Links Column: Resources */}
            <div class="footer-anim space-y-4">
              <h4 class="text-xs font-bold uppercase tracking-widest text-slate-200">
                Resources
              </h4>
              <ul class="space-y-2.5">
                {navLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      class="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav Links Column: Company */}
            <div class="footer-anim space-y-4">
              <h4 class="text-xs font-bold uppercase tracking-widest text-slate-200">
                Company
              </h4>
              <ul class="space-y-2.5">
                {navLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      class="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div class="footer-anim w-full h-[1px] bg-slate-900" />

          {/* Bottom Bar: Copyright & Socials */}
          <div class="footer-anim flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Vantage Digital Copyright Notice */}
            <p class="text-xs text-slate-500 text-center sm:text-left">
              © {currentYear}{" "}
              <span class="text-slate-300 font-semibold hover:text-white transition-colors">
                Vantage Digital
              </span>
              . All rights reserved. Powered by Nova AI Infrastructure.
            </p>

            {/* Social Media Icons */}
            <div class="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  class="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  },
});
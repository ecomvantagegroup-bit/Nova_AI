import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import "./aboutStory.css";

gsap.registerPlugin(ScrollTrigger, Flip);

// Unsplash high-tech AI & abstract imagery
const bentoImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=800&auto=format&fit=crop",
];

export default defineComponent({
  name: "AboutStory",

  setup() {
    const galleryRef = ref(null);
    let flipCtx = null;

    const createTween = () => {
      const galleryElement = galleryRef.value;
      if (!galleryElement) return;

      const galleryItems = galleryElement.querySelectorAll(".gallery__item");

      // Clean up previous animations if resizing window
      if (flipCtx) flipCtx.revert();
      galleryElement.classList.remove("gallery--final");

      flipCtx = gsap.context(() => {
        // 1. Temporarily add final class to capture target FLIP state
        galleryElement.classList.add("gallery--final");
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove("gallery--final");

        // 2. Create the Flip tween
        const flip = Flip.to(flipState, {
          simple: true,
          ease: "power2.inOut",
        });

        // 3. Bind the Flip animation to ScrollTrigger pinning
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: "center center",
            end: "+=120%",
            scrub: 1,
            pin: galleryElement.parentNode,
            anticipatePin: 1,
          },
        });

        tl.add(flip);

        return () => gsap.set(galleryItems, { clearProps: "all" });
      });
    };

    onMounted(() => {
      createTween();
      window.addEventListener("resize", createTween);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", createTween);
      if (flipCtx) flipCtx.revert();
    });

    return () => (
      <section id="about" class="page-section relative w-full">
        {/* Pinned Bento Gallery Wrapper */}
        <div class="gallery-wrap">
          <div
            ref={galleryRef}
            class="gallery gallery--bento gallery--switch"
            id="gallery-about"
          >
            {bentoImages.map((src, idx) => (
              <div key={idx} class="gallery__item">
                <img src={src} alt={`Nova AI Story ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Content revealing smoothly after Bento pin completes */}
        <div class="about-content-section">
          <span class="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-300 uppercase bg-cyan-950/60 border border-cyan-800/40 rounded-full backdrop-blur-md">
            Our Architectural Vision
          </span>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Built for Autonomous Intelligence at Enterprise Scale
          </h2>
          <p class="text-slate-400 text-lg leading-relaxed">
            Nova AI transforms raw operational data into self-healing decision streams, removing friction and automating complex cross-system enterprise workflows.
          </p>
        </div>
      </section>
    );
  },
});
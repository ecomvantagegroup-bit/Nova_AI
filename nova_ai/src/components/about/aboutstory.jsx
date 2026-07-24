import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./aboutStory.css";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

const slidesData = [
  {
    id: "vision",
    badge: "01 / Vision",
    title: "Architecting Autonomous Intelligence",
    description:
      "Nova AI transforms static workflows into cognitive self-healing infrastructure.",
    bg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "origin",
    badge: "02 / Our Origin",
    title: "Born From System Resilience",
    description:
      "Founded in 2022 by ML architects to eliminate manual cloud operations once and for all.",
    bg: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "tech",
    badge: "03 / Neural Engine",
    title: "The Multi-Agent Core",
    isBento: true,
    bg: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "inspiration",
    badge: "04 / Biological Design",
    title: "Autonomic Feedback Loops",
    description:
      "Engineered like the autonomic nervous system: self-regulating, zero-latency, and resilient.",
    bg: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "roadmap",
    badge: "05 / Milestones",
    title: "The Horizon to AGI",
    description:
      "Scaling from localized agent automation in 2022 to full self-healing global enterprise mesh in 2026.",
    bg: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1600&auto=format&fit=crop",
  },
];

export default defineComponent({
  name: "AboutStory",

  setup() {
    const activeIndex = ref(0);
    const containerRef = ref(null);

    let ctx = null;
    let observerInstance = null;
    let pinTrigger = null;
    let isAnimating = false;
    let autoPlayTimer = null;
    const AUTO_PLAY_INTERVAL = 4000; // Time in ms (4 seconds)

    let sections = [];
    let images = [];
    let outerWrappers = [];
    let innerWrappers = [];
    let headingChars = [];

    const splitTextToSpans = (text) =>
      text.split("").map((char, i) => (
        <span key={i} class="clip-char">
          <span class="char-span">{char === " " ? "\u00A0" : char}</span>
        </span>
      ));

    // --- AUTO ANIMATION TIMER CONTROLS ---
    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        if (!isAnimating && observerInstance?.isEnabled) {
          const nextIdx = (activeIndex.value + 1) % slidesData.length;
          gotoSection(nextIdx, 1);
        }
      }, AUTO_PLAY_INTERVAL);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    const resetAutoPlay = () => {
      startAutoPlay();
    };

    const setInitialState = () => {
      sections.forEach((sec, idx) => {
        if (idx === 0) {
          gsap.set(sec, { autoAlpha: 1, zIndex: 2 });
          gsap.set(outerWrappers[idx], { yPercent: 0 });
          gsap.set(innerWrappers[idx], { yPercent: 0 });
          gsap.set(images[idx], { yPercent: 0 });
          gsap.set(headingChars[idx], { autoAlpha: 1, yPercent: 0 });
        } else {
          gsap.set(sec, { autoAlpha: 0, zIndex: 0 });
          gsap.set(outerWrappers[idx], { yPercent: 100 });
          gsap.set(innerWrappers[idx], { yPercent: -100 });
          gsap.set(images[idx], { yPercent: 15 });
          gsap.set(headingChars[idx], { autoAlpha: 0, yPercent: 120 });
        }
      });
    };

    const releaseScroll = (direction) => {
      stopAutoPlay();
      if (observerInstance) {
        observerInstance.disable();
      }

      if (pinTrigger) {
        const targetScroll =
          direction > 0
            ? pinTrigger.end + 2
            : pinTrigger.start - 2;

        gsap.to(window, {
          scrollTo: targetScroll,
          duration: 0.1,
          overwrite: "auto",
        });
      }
    };

    const gotoSection = (index, direction) => {
      const total = slidesData.length;

      if (isAnimating) return false;

      if (index < 0) {
        releaseScroll(-1);
        return false;
      }

      if (index >= total) {
        releaseScroll(1);
        return false;
      }

      if (index === activeIndex.value) return false;

      isAnimating = true;
      const prevIndex = activeIndex.value;
      activeIndex.value = index;

      const dFactor = direction === -1 ? -1 : 1;

      sections.forEach((sec, idx) => {
        gsap.set(sec, { zIndex: idx === index ? 2 : idx === prevIndex ? 1 : 0 });
      });

      gsap.set(sections[index], { autoAlpha: 1 });
      gsap.set(outerWrappers[index], { yPercent: 100 * dFactor });
      gsap.set(innerWrappers[index], { yPercent: -100 * dFactor });
      gsap.set(images[index], { yPercent: 15 * dFactor });
      gsap.set(headingChars[index], { autoAlpha: 0, yPercent: 120 * dFactor });

      const tl = gsap.timeline({
        defaults: { duration: 0.95, ease: "power2.inOut" },
        onComplete: () => {
          gsap.set(sections[prevIndex], { autoAlpha: 0, zIndex: 0 });
          gsap.set(sections[index], { zIndex: 2 });
          isAnimating = false;
        },
      });

      tl.to(images[prevIndex], { yPercent: -15 * dFactor }, 0)
        .to(outerWrappers[prevIndex], { yPercent: -100 * dFactor }, 0)
        .to(innerWrappers[prevIndex], { yPercent: 100 * dFactor }, 0)
        .fromTo(
          [outerWrappers[index], innerWrappers[index]],
          {
            yPercent: (i) => (i === 0 ? 100 * dFactor : -100 * dFactor),
          },
          { yPercent: 0 },
          0
        )
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          headingChars[index],
          { autoAlpha: 0, yPercent: 120 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: {
              each: 0.015,
              from: "random",
            },
          },
          0.18
        );

      return true;
    };

    onMounted(() => {
      const container = containerRef.value;
      if (!container) return;

      ctx = gsap.context(() => {
        sections = gsap.utils.toArray(".story-slide", container);
        images = gsap.utils.toArray(".story-slide .bg", container);
        outerWrappers = gsap.utils.toArray(".story-slide .outer", container);
        innerWrappers = gsap.utils.toArray(".story-slide .inner", container);
        headingChars = sections.map((sec) => sec.querySelectorAll(".char-span"));

        activeIndex.value = 0;
        setInitialState();

        observerInstance = Observer.create({
          target: window,
          type: "wheel,touch",
          wheelSpeed: -1,
          tolerance: 14,
          preventDefault: true,
          debounce: false,
          onUp: () => {
            if (isAnimating) return;
            resetAutoPlay();
            gotoSection(activeIndex.value + 1, 1);
          },
          onDown: () => {
            if (isAnimating) return;
            resetAutoPlay();
            gotoSection(activeIndex.value - 1, -1);
          },
        });

        observerInstance.disable();

        pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "+=1",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: (self) => {
            if (self.direction > 0) {
              activeIndex.value = 0;
              setInitialState();
              observerInstance?.enable();
              startAutoPlay();
            }
          },
          onEnterBack: (self) => {
            if (self.direction < 0) {
              activeIndex.value = slidesData.length - 1;
              sections.forEach((sec, idx) => {
                if (idx === slidesData.length - 1) {
                  gsap.set(sec, { autoAlpha: 1, zIndex: 2 });
                  gsap.set(outerWrappers[idx], { yPercent: 0 });
                  gsap.set(innerWrappers[idx], { yPercent: 0 });
                  gsap.set(images[idx], { yPercent: 0 });
                  gsap.set(headingChars[idx], { autoAlpha: 1, yPercent: 0 });
                } else {
                  gsap.set(sec, { autoAlpha: 0, zIndex: 0 });
                  gsap.set(outerWrappers[idx], { yPercent: -100 });
                  gsap.set(innerWrappers[idx], { yPercent: 100 });
                  gsap.set(images[idx], { yPercent: -15 });
                  gsap.set(headingChars[idx], { autoAlpha: 0, yPercent: -120 });
                }
              });
              observerInstance?.enable();
              startAutoPlay();
            }
          },
          onLeave: () => {
            observerInstance?.disable();
            stopAutoPlay();
          },
          onLeaveBack: () => {
            observerInstance?.disable();
            stopAutoPlay();
          },
        });

        ScrollTrigger.refresh();
      }, container);
    });

    onBeforeUnmount(() => {
      stopAutoPlay();
      observerInstance?.kill();
      pinTrigger?.kill();
      ctx?.revert();
    });

    return () => (
      <section
        ref={containerRef}
        class="story-observer-container"
        id="about"
        onMouseenter={stopAutoPlay}
        onMouseleave={startAutoPlay}
      >
        <div class="story-nav-dots">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              class={["story-dot", activeIndex.value === idx ? "active" : ""]}
              onClick={() => {
                if (!isAnimating && activeIndex.value !== idx) {
                  const dir = idx > activeIndex.value ? 1 : -1;
                  resetAutoPlay();
                  gotoSection(idx, dir);
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {slidesData.map((slide) => (
          <section key={slide.id} class="story-slide">
            <div class="outer">
              <div class="inner">
                <div
                  class="bg"
                  style={{ "--bg-img": `url("${slide.bg}")` }}
                >
                  <div class="max-w-4xl mx-auto text-center px-6 space-y-6 z-10">
                    <span class="inline-block px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/60 text-cyan-300 text-xs font-bold tracking-widest uppercase">
                      {slide.badge}
                    </span>

                    <h2 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                      {splitTextToSpans(slide.title)}
                    </h2>

                    {slide.description && (
                      <p class="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        {slide.description}
                      </p>
                    )}

                    {slide.isBento && (
                      <div class="micro-bento-grid">
                        <div class="micro-bento-card border-cyan-500/30">
                          <h4 class="text-lg font-bold text-cyan-300">
                            Agent Coordination
                          </h4>
                          <p class="text-xs text-slate-400">
                            LLM-powered tasks executing independently across cloud endpoints.
                          </p>
                        </div>
                        <div class="micro-bento-card border-purple-500/30">
                          <h4 class="text-lg font-bold text-purple-300">
                            Sub-ms Synthesis
                          </h4>
                          <p class="text-xs text-slate-400">
                            Instant pipeline synchronization without operational lag.
                          </p>
                        </div>
                        <div class="micro-bento-card border-emerald-500/30">
                          <h4 class="text-lg font-bold text-emerald-300">
                            Private Perimeter
                          </h4>
                          <p class="text-xs text-slate-400">
                            Air-gapped enterprise safety for strict data compliance.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
    );
  },
});
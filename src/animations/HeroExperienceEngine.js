import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

export function initHeroExperience({
  heroStageRef,
  videoRef,
  grainCanvasRef,
  svgTextGroupRef,
  svgTextRef,
  svgMaskLayerRef,
  revealedHeroCopyRef,
}) {
  if (!heroStageRef.current || !videoRef.current) {
    return () => {};
  }

  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // 1. Force top scroll position on refresh to prevent layout calculation glitches
  if (typeof window !== "undefined") {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }

  // 2. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);
  const updateLenis = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(updateLenis);
  gsap.ticker.lagSmoothing(0);

  // 3. Film Grain Canvas
  let animNoiseFrameId = null;
  let resizeHandler = null;
  const canvas = grainCanvasRef.current;

  if (canvas) {
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    resizeHandler = resizeCanvas;
    window.addEventListener("resize", resizeHandler);

    const createNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      const imgData = ctx.createImageData(w, h);
      const buffer = new Uint32Array(imgData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.random() < 0.5 ? 0xffffffff : 0;
      }
      ctx.putImageData(imgData, 0, 0);
    };

    let frame = 0;
    const animNoise = () => {
      if (frame % 2 === 0) createNoise();
      frame++;
      animNoiseFrameId = requestAnimationFrame(animNoise);
    };
    animNoise();
  }

  // 4. Calculate dynamic transform origin over letter 'V'
  const computeTargetOrigin = () => {
    if (!svgTextRef.current) return "50% 50%";
    try {
      const bbox = svgTextRef.current.getBBox();
      const x = ((bbox.x + bbox.width * 0.63) / 1920) * 100;
      const y = ((bbox.y + bbox.height / 2) / 1080) * 100;
      return `${x}% ${y}%`;
    } catch {
      return "50% 50%";
    }
  };

  // 5. GSAP Context & MatchMedia
  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
    CustomEase.create("cinematicOut", "M0,0 C0.05,0.7,0.1,1 1,1");
    CustomEase.create("tunnelAcc", "M0,0 C0.4,0,0.2,1 1,1");
    CustomEase.create("smoothReveal", "M0,0 C0.16,1,0.3,1 1,1");

    // Force strict reset of initial properties
    gsap.set(
      [
        ".hero-entrance-subheadline",
        ".hero-entrance-title",
        ".hero-entrance-desc",
        ".hero-entrance-btn",
        ".hero-entrance-scroll",
      ],
      { opacity: 1, y: 0, filter: "blur(0px)" }
    );
    gsap.set(svgMaskLayerRef.current, { opacity: 1 });
    gsap.set(revealedHeroCopyRef.current, {
      opacity: 0,
      filter: "blur(20px)",
      y: 40,
    });

    // Entrance animation timeline
    const introTl = gsap.timeline({ defaults: { ease: "cinematicOut" } });
    introTl
      .fromTo(
        ".hero-entrance-subheadline",
        { opacity: 0, y: 25, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, delay: 0.1 }
      )
      .fromTo(
        ".hero-entrance-title",
        { opacity: 0, y: 35, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
        "-=0.6"
      )
      .fromTo(
        ".hero-entrance-desc",
        { opacity: 0, y: 25, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
        "-=0.8"
      )
      .fromTo(
        ".hero-entrance-btn",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.7"
      )
      .fromTo(
        ".hero-entrance-scroll",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.6"
      );

    // Responsive ScrollTrigger logic using matchMedia
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions;
        const zoomScale = isMobile ? 180 : 160;

        if (svgTextGroupRef.current) {
          gsap.set(svgTextGroupRef.current, {
            transformOrigin: computeTargetOrigin(),
          });
        }

        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroStageRef.current,
            start: "top top",
            end: isMobile ? "+=130%" : "+=160%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
          defaults: { ease: "none" },
        });

        mainTimeline
          // Step 1: Hide initial entrance text
          .to(
            [
              ".hero-entrance-subheadline",
              ".hero-entrance-title",
              ".hero-entrance-desc",
              ".hero-entrance-btn",
              ".hero-entrance-scroll",
            ],
            {
              opacity: 0,
              y: -35,
              filter: "blur(10px)",
              duration: 0.35,
              stagger: 0.03,
            },
            0
          )
          // Step 2: Background video scale
          .to(videoRef.current, { scale: 1.1, duration: 2 }, 0)

          // Step 3: SVG Mask zoom
          .to(
            svgTextGroupRef.current,
            { scale: zoomScale, duration: 2, ease: "tunnelAcc" },
            0.1
          )

          // Step 4: Hide mask
          .to(
            svgMaskLayerRef.current,
            { opacity: 0, duration: 0.3, ease: "power1.out" },
            0.85
          )

          // Step 5: Reveal hidden headline
          .to(
            revealedHeroCopyRef.current,
            {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.6,
              ease: "smoothReveal",
            },
            0.95
          )

          // Step 6: Gradient transition
          .to(
            ".layer-gradient-bottom",
            {
              opacity: 1,
              background:
                "linear-gradient(0deg, rgba(7,7,9,1) 0%, rgba(7,7,9,0.85) 50%, rgba(7,7,9,0) 100%)",
              duration: 0.5,
            },
            1.2
          );
      }
    );

    // Force recalculation after setup
    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh();
  }, heroStageRef);

  // Desktop Mouse Tilt Effect
  let mouseMoveHandler = null;
  if (heroStageRef.current && window.innerWidth >= 1024) {
    mouseMoveHandler = (e) => {
      if (!videoRef.current) return;
      const xPos = (e.clientX / window.innerWidth - 0.5) * 16;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 16;
      gsap.to(videoRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    heroStageRef.current.addEventListener("mousemove", mouseMoveHandler);
  }

  // Cleanup handler
  return () => {
    mm.revert();
    ctx.revert();
    if (heroStageRef.current && mouseMoveHandler) {
      heroStageRef.current.removeEventListener("mousemove", mouseMoveHandler);
    }
    if (animNoiseFrameId) {
      cancelAnimationFrame(animNoiseFrameId);
    }
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
    }
    gsap.ticker.remove(updateLenis);
    lenis.destroy();
  };
}
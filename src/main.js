import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  // Stare de start: lampa stinsă, textul ascuns
  gsap.set(".lamp-lit", { opacity: 0 });
  gsap.set(".lamp-glow, .lamp-core", { strokeDashoffset: 1 });
  gsap.set(".halo", { opacity: 0, scale: 0.6 });
  gsap.set(".hero-copy", { opacity: 0, y: 40 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
    },
  });

  tl.to(".hero-hint", { opacity: 0, duration: 0.08 }, 0)
    .to(".lamp-glow, .lamp-core", { strokeDashoffset: 0, duration: 0.55 }, 0.05)
    .to(".lamp-lit", { opacity: 1, duration: 0.5 }, 0.15)
    .to(".halo", { opacity: 1, scale: 1.4, duration: 0.7 }, 0.1)
    .to(".hero-copy", { opacity: 1, y: 0, duration: 0.25 }, 0.65);
}
import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Hero: lampa se aprinde ---------- */
function initHero() {
  if (!document.querySelector(".hero")) return;

  gsap.set(".lamp-lit", { opacity: 0 });
  gsap.set(".lamp-glow, .lamp-core", { strokeDashoffset: 1 });
  gsap.set(".halo", { opacity: 0, scale: 0.6 });
  gsap.set(".hero-copy", { opacity: 0, y: 40 });

  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    })
    .to(".hero-hint", { opacity: 0, duration: 0.08 }, 0)
    .to(".lamp-glow, .lamp-core", { strokeDashoffset: 0, duration: 0.55 }, 0.05)
    .to(".lamp-lit", { opacity: 1, duration: 0.5 }, 0.15)
    .to(".halo", { opacity: 1, scale: 1.4, duration: 0.7 }, 0.1)
    .to(".hero-copy", { opacity: 1, y: 0, duration: 0.25 }, 0.65);
}

/* ---------- Proces: linia coboară, pașii apar ---------- */
function initProcess() {
  const track = document.querySelector(".process-track");
  if (!track) return;

  const core = track.querySelector(".pl-core");
  const glow = track.querySelector(".pl-glow");
  const tip = track.querySelector(".pl-tip");
  const len = core.getTotalLength();

  gsap.set([core, glow], { strokeDashoffset: 1 });
  gsap.set(".step-body", { opacity: 0, y: 40 });

  ScrollTrigger.create({
    trigger: track,
    start: "top 60%",
    end: "bottom 70%",
    scrub: true,
    onUpdate(self) {
      const p = self.progress;
      core.style.strokeDashoffset = 1 - p;
      glow.style.strokeDashoffset = 1 - p;

      const pt = core.getPointAtLength(p * len);
      tip.style.left = (pt.x / 120) * 100 + "%";
      tip.style.top = (pt.y / 1600) * 100 + "%";
      tip.style.opacity = p > 0.003 && p < 0.997 ? 1 : 0;
    },
  });

  gsap.utils.toArray(".step").forEach((step) => {
    gsap.to(step.querySelector(".step-body"), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

/* ---------- Apariție generică ---------- */
function initReveal() {
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

if (!reduceMotion) {
  initHero();
  initProcess();
  initReveal();
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
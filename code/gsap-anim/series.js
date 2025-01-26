import { prefersReducedMotion } from "./utils.js";

export let heroStartAnimation = gsap.timeline();

if (!prefersReducedMotion.matches) {
  heroStartAnimation
    .from(".series__genre li", {
      x: -10,
      opacity: 0,
      stagger: 0.3,
    })
    .from(".series__title", {
      y: -20,
      opacity: 0,
      duration: 1,
    })
    .from(".series__spec", {
      x: -15,
      opacity: 0,
    })
    .from(".series__desc", {
      opacity: 0,
      duration: 2,
    })
    .fromTo(
      ".series__rating svg",
      {
        opacity: 0,
        scale: 2,
        duration: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
      },
      "-=1.2"
    )
    .from(
      ".button",
      {
        scale: 0,
        opacity: 0,
        duration: 0.8,
      },
      "-=1"
    )
    .from(".series__age--desk", {
      xPercent: 50,
      opacity: 0,
      delay: 2.4,
    });
}

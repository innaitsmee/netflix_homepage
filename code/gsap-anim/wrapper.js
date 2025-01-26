import { prefersReducedMotion } from "./utils.js";

export let wrapperAnimation = gsap.timeline();

if (!prefersReducedMotion.matches) {
  wrapperAnimation.from("#wrapper", {
    opacity: 0,
    duration: 6,
  });
}
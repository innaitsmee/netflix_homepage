import { prefersReducedMotion } from "./utils.js";

export let headerAnimation = gsap.timeline();

if (!prefersReducedMotion.matches) {
  headerAnimation.from(
    ".header__date",
    {
      y: -20,
      opacity: 0,
      delay: 4.1,
    },
  );
}

import { prefersReducedMotion } from "./utils.js";

export let swiperAnimation = gsap.timeline();

if (!prefersReducedMotion.matches) {
  swiperAnimation
    .from([".recommendations__title", ".swiper"], {
      xPercent: 110,
      duration: 2,
      delay: 4.2,
    })
    .fromTo(".swiper-button", {
      scale: 0.5,
      duration: 0.7,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
    });
}

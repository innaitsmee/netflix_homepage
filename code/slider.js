export const swiper = new Swiper(".swiper", {
  loop: false,
  slidesPerView: 2,
  spaceBetween: 12,
  longswipes: true,
  speed: 500,
  breakpoints: {
    480: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 32,
    },
  },
  navigation: {
    nextEl: ".swiper-button.next",
    prevEl: ".swiper-button.prev",
  },
});

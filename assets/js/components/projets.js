window.initProjects = function () {
  const section = document.getElementById("projets");
  if (!section) return;

  const sliderEl = section.querySelector(".projects-slider");
  const slides = section.querySelectorAll(".swiper-slide");
  const currentEl = section.querySelector(".projects-current");
  const totalEl = section.querySelector(".projects-total");
  const nextEl = section.querySelector(".projects-next");
  const prevEl = section.querySelector(".projects-prev");

  if (!sliderEl || !slides.length || typeof Swiper === "undefined") return;

  const totalSlides = slides.length;

  if (totalEl) {
    totalEl.textContent = String(totalSlides).padStart(2, "0");
  }

  if (sliderEl.swiper) {
    sliderEl.swiper.destroy(true, true);
  }

  const swiper = new Swiper(sliderEl, {
    loop: totalSlides > 4,
    speed: 900,
    grabCursor: true,
    watchSlidesProgress: true,
    slidesPerView: 1.08,
    spaceBetween: 18,
    breakpoints: {
      640: { slidesPerView: 1.15, spaceBetween: 20 },
      768: { slidesPerView: 1.4, spaceBetween: 22 },
      900: { slidesPerView: 2.1, spaceBetween: 24 },
      1280: { slidesPerView: 4.1, spaceBetween: 22 }
    },
    on: {
      init(instance) {
        if (currentEl) {
          currentEl.textContent = String(instance.realIndex + 1).padStart(2, "0");
        }
      },
      slideChange(instance) {
        if (currentEl) {
          currentEl.textContent = String(instance.realIndex + 1).padStart(2, "0");
        }
      }
    }
  });

  if (nextEl) {
    nextEl.addEventListener("click", () => swiper.slideNext());
  }

  if (prevEl) {
    prevEl.addEventListener("click", () => swiper.slidePrev());
  }
};
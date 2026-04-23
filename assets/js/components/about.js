const elements = document.querySelectorAll(
  ".about-header, .about-card, .about-cta"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.18 }
);

elements.forEach((el, i) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = `all 0.6s ease ${i * 0.06}s`;
  observer.observe(el);
});
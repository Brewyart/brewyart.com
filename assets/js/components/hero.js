function initHero() {
  const root = document.getElementById("hero");
  if (!root) return;

  const stage = root.querySelector("#hero-stage");
  const bg = root.querySelector(".hero-bg");
  const kickerEl = root.querySelector("#hero-kicker");
  const titleEl = root.querySelector("#hero-title");
  const textEl = root.querySelector("#hero-text");
  const primaryBtn = root.querySelector("#hero-primary-btn");
  const secondaryBtn = root.querySelector("#hero-secondary-btn");
  const tagsEl = root.querySelector("#hero-tags");
  const currentEl = root.querySelector(".hero-current");
  const totalEl = root.querySelector(".hero-total");
  const barFill = root.querySelector(".hero-bar-fill");
  const nextBtn = root.querySelector(".hero-next");
  const prevBtn = root.querySelector(".hero-prev");
  const imgWebp = root.querySelector("#hero-img-webp");
  const imgPng = root.querySelector("#hero-img-png");

  if (
    !stage ||
    !bg ||
    !kickerEl ||
    !titleEl ||
    !textEl ||
    !primaryBtn ||
    !secondaryBtn ||
    !tagsEl ||
    !currentEl ||
    !totalEl ||
    !barFill ||
    !nextBtn ||
    !prevBtn ||
    !imgWebp ||
    !imgPng
  ) {
    return;
  }

  const heroThemes = [
    {
      kicker: "Branding sportif premium",
      title: "Des visuels qui marquent.",
      text: "Identités, campagnes et créations conçues pour donner plus de poids, plus de niveau et plus de présence à votre projet.",
      primaryLabel: "Voir les services",
      primaryHref: "#services",
      secondaryLabel: "Voir les projets",
      secondaryHref: "#projets",
      tags: ["Logos", "Mascottes", "Branding sportif"],
      gradientClass: "ambient-gradient--theme-1",
      image: "image_hero1"
    },
    {
      kicker: "Direction artistique claire",
      title: "On vise le haut du panier.",
      text: "Une direction visuelle cohérente pour transformer une image dispersée en marque forte, lisible et ambitieuse.",
      primaryLabel: "Découvrir l’approche",
      primaryHref: "#services",
      secondaryLabel: "Voir des exemples",
      secondaryHref: "#projets",
      tags: ["Clarté", "Cohérence", "Impact"],
      gradientClass: "ambient-gradient--theme-2",
      image: "image_hero2"
    },
    {
      kicker: "Web & contenu premium",
      title: "Une image pensée pour performer.",
      text: "Landing pages, contenus et expériences visuelles créés pour capter vite, convaincre mieux et marquer durablement.",
      primaryLabel: "Explorer le digital",
      primaryHref: "#services",
      secondaryLabel: "Voir les projets",
      secondaryHref: "#projets",
      tags: ["Web", "Contenu", "Expérience"],
      gradientClass: "ambient-gradient--theme-3",
      image: "image_hero3"
    },
    {
      kicker: "Campagnes & visuels",
      title: "Ton image mérite la première place.",
      text: "Des visuels qui imposent une énergie, racontent un niveau et donnent immédiatement envie d’aller plus loin.",
      primaryLabel: "Voir le travail",
      primaryHref: "#projets",
      secondaryLabel: "Me contacter",
      secondaryHref: "#contact",
      tags: ["Campagnes", "Posters", "Visuels premium"],
      gradientClass: "ambient-gradient--theme-4",
      image: "image_hero4"
    }
  ];

  const gradientThemeClasses = [
    "ambient-gradient--theme-1",
    "ambient-gradient--theme-2",
    "ambient-gradient--theme-3",
    "ambient-gradient--theme-4"
  ];

  const DURATION = 5000;
  let currentIndex = 0;
  let autoplay = null;

  function applyGradientTheme(className) {
    bg.classList.remove(...gradientThemeClasses);
    bg.classList.add(className);
  }

  function updateHeroImage(imageName) {
    imgPng.style.opacity = "0";

    window.clearTimeout(stage._imageTimer);
    stage._imageTimer = window.setTimeout(() => {
      imgWebp.setAttribute("srcset", `assets/img/${imageName}.webp`);
      imgPng.setAttribute("src", `assets/img/${imageName}.png`);
      imgPng.style.opacity = "1";
    }, 140);
  }

  function renderTheme(index) {
    const item = heroThemes[index];

    kickerEl.textContent = item.kicker;
    titleEl.textContent = item.title;
    textEl.textContent = item.text;

    primaryBtn.textContent = item.primaryLabel;
    primaryBtn.setAttribute("href", item.primaryHref);

    secondaryBtn.textContent = item.secondaryLabel;
    secondaryBtn.setAttribute("href", item.secondaryHref);

    tagsEl.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join("");

    currentEl.textContent = String(index + 1).padStart(2, "0");
    totalEl.textContent = String(heroThemes.length).padStart(2, "0");

    applyGradientTheme(item.gradientClass);
    updateHeroImage(item.image);
  }

  function animateBar() {
    barFill.style.transition = "none";
    barFill.style.width = "0%";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        barFill.style.transition = `width ${DURATION}ms linear`;
        barFill.style.width = "100%";
      });
    });
  }

  function switchTheme(index) {
    stage.classList.add("is-switching");
    window.clearTimeout(stage._switchTimer);

    currentIndex = index;
    renderTheme(currentIndex);

    stage._switchTimer = window.setTimeout(() => {
      stage.classList.remove("is-switching");
    }, 420);
  }

  function nextTheme() {
    const next = (currentIndex + 1) % heroThemes.length;
    switchTheme(next);
  }

  function prevTheme() {
    const prev = (currentIndex - 1 + heroThemes.length) % heroThemes.length;
    switchTheme(prev);
  }

  function startAutoplay() {
    stopAutoplay();
    animateBar();
    autoplay = window.setInterval(() => {
      nextTheme();
      animateBar();
    }, DURATION);
  }

  function stopAutoplay() {
    if (autoplay) {
      clearInterval(autoplay);
      autoplay = null;
    }
  }

  nextBtn.addEventListener("click", () => {
    nextTheme();
    startAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevTheme();
    startAutoplay();
  });

  stage.addEventListener("mouseenter", stopAutoplay);
  stage.addEventListener("mouseleave", startAutoplay);

  imgPng.addEventListener("load", () => {
    imgPng.style.opacity = "1";
  });

  renderTheme(0);

  if (typeof window.initAmbientGradients === "function") {
    window.initAmbientGradients(root);
  }

  startAutoplay();
}

window.initHero = initHero;
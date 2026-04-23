function initServices() {
  const root = document.getElementById('services');
  if (!root) return;

  const grid = root.querySelector('#services-grid');
  if (!grid) return;

  const servicesData = [
    {
      title: 'Branding',
      text: 'Identités visuelles, logos et systèmes de marque pensés pour durer et imposer un vrai niveau.',
      image: 'assets/img/services1.png',
      href: '#contact'
    },
    {
      title: 'Digital',
      text: 'Landing pages et sections sur mesure conçues pour transformer une présence web en vraie vitrine premium.',
      image: 'assets/img/services2.png',
      href: '#contact'
    },
    {
      title: 'Strategy',
      text: 'Direction artistique, positionnement et arbitrages créatifs pour construire une image cohérente.',
      image: 'assets/img/services3.png',
      href: '#contact'
    },
    {
      title: 'Media',
      text: 'Visuels premium, contenus de campagne et créations pensées pour marquer vite et durablement.',
      image: 'assets/img/services4.png',
      href: '#contact'
    }
  ];

  grid.innerHTML = servicesData.map((service) => `
    <article class="service-card">
      <div class="service-visual">
        <img class="service-image" src="${service.image}" alt="${service.title}" loading="lazy" />
        <div class="service-content">
          <h3 class="service-title">${service.title}</h3>
          <p class="service-text">${service.text}</p>
          <a class="service-cta" href="${service.href}">Contact</a>
        </div>
      </div>
    </article>
  `).join('');

  const cards = root.querySelectorAll('.service-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('is-image-visible');
        }, index * 180);

        setTimeout(() => {
          card.classList.add('is-content-visible');
        }, index * 220 + 220);
      });

      observer.disconnect();
    });
  }, {
    threshold: 0.22
  });

  if (cards.length) {
    observer.observe(cards[0]);
  }
}

window.initServices = initServices;

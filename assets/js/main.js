async function loadSection(targetId, filePath) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(filePath, { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(`Impossible de charger ${filePath} (${response.status})`);
    }

    const html = await response.text();
    target.innerHTML = html;
    target.dataset.loaded = 'true';
  } catch (error) {
    console.error(error);
    target.dataset.loaded = 'false';
    target.innerHTML = `
      <div class="section-wrap" style="padding: 48px 0;">
        <div class="glass-card" style="padding: 24px;">
          <p style="margin: 0; color: #b42318; font-weight: 600;">Section introuvable</p>
          <p style="margin: 10px 0 0; color: #5c6675;">Le fichier <strong>${filePath}</strong> n'a pas pu être chargé.</p>
        </div>
      </div>
    `;
  }
}

function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)');
  if (isCoarsePointer.matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  const smoothing = 0.22;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    const hoverTarget = event.target.closest(
      'a, button, input, textarea, select, label, [role="button"]'
    );

    cursor.classList.toggle('is-hovering', Boolean(hoverTarget));
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * smoothing;
    currentY += (mouseY - currentY) * smoothing;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

async function loadCoreSections() {
  await Promise.all([
    loadSection('hero', 'sections/hero.html'),
    loadSection('services', 'sections/services.html'),
    loadSection('projets', 'sections/projets.html'),
    loadSection('game', 'sections/game.html'),
    loadSection('about', 'sections/about.html'),
    loadSection('clients', 'sections/clients.html'),
    loadSection('contact', 'sections/contact.html')
  ]);
}

function runSectionInitializers() {
  const initializers = [
    window.initHero,
    window.initServices,
    window.initProjects,
    window.initGame,
    window.initAbout,
    window.initClients,
    window.initContact
  ];

  initializers.forEach((initializer) => {
    if (typeof initializer === 'function') {
      initializer();
    }
  });
}

async function initSite() {
  document.documentElement.classList.add('is-loading');

  initCustomCursor();
  await loadCoreSections();
  runSectionInitializers();

  document.documentElement.classList.remove('is-loading');
  document.documentElement.classList.add('is-ready');
}

document.addEventListener('DOMContentLoaded', () => {
  initSite().catch((error) => {
    console.error("Erreur d'initialisation du site :", error);
    document.documentElement.classList.remove('is-loading');
  });
});

window.loadSection = loadSection;
window.initCustomCursor = initCustomCursor;
window.runSectionInitializers = runSectionInitializers;
window.initSite = initSite;
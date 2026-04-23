(() => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  document.body.appendChild(canvas);

  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9998';

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)');
  if (isCoarsePointer.matches) {
    canvas.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  const smoothing = 0.22;

  // Ajuste si besoin selon le centre réel de ton ballon
  const tipOffsetX = 16;
  const tipOffsetY = 23;

  const trailColor = '255, 170, 80';
  const baseLineWidth = 15;
  const fadeSpeed = 0.018;
  const maxPoints = 140;
  const minPointDistance = 1.5;

  let points = [];

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  function addPoint(x, y) {
    const nextPoint = { x, y, life: 1 };

    const lastPoint = points[points.length - 1];
    if (lastPoint && distance(lastPoint, nextPoint) < minPointDistance) {
      return;
    }

    points.push(nextPoint);

    if (points.length > maxPoints) {
      points.shift();
    }
  }

  function agePoints() {
    for (let i = 0; i < points.length; i++) {
      points[i].life -= fadeSpeed;
    }

    points = points.filter((point) => point.life > 0);
  }

  function drawSmoothTrail() {
    if (points.length < 3) return;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'butt';

    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const current = points[i];
      const next = points[i + 1];

      const alpha = Math.max(0, Math.min(1, current.life));
      if (alpha <= 0) continue;

      const midX1 = (prev.x + current.x) * 0.5;
      const midY1 = (prev.y + current.y) * 0.5;
      const midX2 = (current.x + next.x) * 0.5;
      const midY2 = (current.y + next.y) * 0.5;

      const dynamicWidth = Math.max(0.75, baseLineWidth * Math.pow(alpha, 0.9));

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${trailColor}, ${alpha * 0.95})`;
      ctx.lineWidth = dynamicWidth;
      ctx.moveTo(midX1, midY1);
      ctx.quadraticCurveTo(current.x, current.y, midX2, midY2);
      ctx.stroke();
    }
  }

  function drawTrail() {
    ctx.clearRect(0, 0, width, height);

    currentX += (mouseX - currentX) * smoothing;
    currentY += (mouseY - currentY) * smoothing;

    addPoint(currentX + tipOffsetX, currentY + tipOffsetY);
    drawSmoothTrail();
    agePoints();

    requestAnimationFrame(drawTrail);
  }

  drawTrail();
})();
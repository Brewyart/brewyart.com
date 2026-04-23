function initAmbientGradients(scope = document) {
  const gradients = scope.querySelectorAll(".ambient-gradient[data-glow='mouse']");
  if (!gradients.length) return;

  const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  gradients.forEach((gradient) => {
    if (gradient.dataset.ambientBound === "true") return;
    gradient.dataset.ambientBound = "true";

    if (!supportsFinePointer) {
      gradient.style.setProperty("--ag-x", "50%");
      gradient.style.setProperty("--ag-y", "34%");
      return;
    }

    gradient.addEventListener("mousemove", (event) => {
      const rect = gradient.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      gradient.style.setProperty("--ag-x", `${x}%`);
      gradient.style.setProperty("--ag-y", `${y}%`);
    });

    gradient.addEventListener("mouseleave", () => {
      gradient.style.setProperty("--ag-x", "50%");
      gradient.style.setProperty("--ag-y", "50%");
    });
  });
}

window.initAmbientGradients = initAmbientGradients;
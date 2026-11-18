function addZoomControls(diagram) {
  const svg = diagram.querySelector("svg");

  if (!svg || diagram.dataset.zoomable) {
    return Boolean(svg);
  }

  diagram.dataset.zoomable = "true";

  let zoom = 1;
  const naturalWidth = svg.getBoundingClientRect().width;
  const originalWidth = svg.style.width;
  const originalMaxWidth = svg.style.maxWidth;
  const controls = document.createElement("div");
  controls.className = "mermaid-controls";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", "Diagram zoom controls");

  const zoomOut = document.createElement("button");
  zoomOut.type = "button";
  zoomOut.textContent = "−";
  zoomOut.setAttribute("aria-label", "Zoom out");

  const zoomLevel = document.createElement("span");
  zoomLevel.className = "mermaid-zoom-level";
  zoomLevel.setAttribute("aria-live", "polite");

  const zoomIn = document.createElement("button");
  zoomIn.type = "button";
  zoomIn.textContent = "+";
  zoomIn.setAttribute("aria-label", "Zoom in");

  const reset = document.createElement("button");
  reset.type = "button";
  reset.textContent = "Reset";
  reset.setAttribute("aria-label", "Reset diagram zoom");

  function updateZoom(nextZoom) {
    zoom = Math.min(2.5, Math.max(0.5, nextZoom));

    if (zoom === 1) {
      svg.style.width = originalWidth;
      svg.style.maxWidth = originalMaxWidth;
      diagram.classList.remove("is-zoomed");
    } else {
      svg.style.maxWidth = "none";
      svg.style.width = `${naturalWidth * zoom}px`;
      diagram.classList.add("is-zoomed");
    }

    zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom <= 0.5;
    zoomIn.disabled = zoom >= 2.5;
  }

  svg.addEventListener("click", () => updateZoom(zoom > 1 ? 1 : 2.5));
  zoomOut.addEventListener("click", () => updateZoom(zoom - 0.25));
  zoomIn.addEventListener("click", () => updateZoom(zoom + 0.25));
  reset.addEventListener("click", () => updateZoom(1));
  svg.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    event.preventDefault();
    updateZoom(zoom + (event.deltaY < 0 ? 0.1 : -0.1));
  }, { passive: false });

  controls.append(zoomOut, zoomLevel, zoomIn, reset);
  diagram.prepend(controls);
  updateZoom(zoom);

  return true;
}

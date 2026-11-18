const bannerImages = document.querySelectorAll(".prose > picture > img");

if (bannerImages.length) {
  const isPortuguese = document.documentElement.lang.toLowerCase().startsWith("pt");
  const dialog = document.createElement("dialog");
  dialog.className = "image-zoom-dialog";
  dialog.setAttribute("aria-label", isPortuguese ? "Pré-visualização da imagem" : "Image preview");

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "image-zoom-dialog-close";
  closeButton.textContent = isPortuguese ? "Fechar" : "Close";
  closeButton.setAttribute("aria-label", isPortuguese ? "Fechar a imagem ampliada" : "Close enlarged image");

  const previewImage = document.createElement("img");
  previewImage.className = "image-zoom-dialog-image";

  dialog.append(closeButton, previewImage);
  document.body.append(dialog);

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => previewImage.removeAttribute("src"));

  bannerImages.forEach((image) => {
    const picture = image.closest("picture");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "image-zoom-trigger";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute(
      "aria-label",
      isPortuguese ? `Ampliar imagem: ${image.alt}` : `Enlarge image: ${image.alt}`,
    );

    picture.before(button);
    button.append(picture);
    button.addEventListener("click", () => {
      previewImage.src = image.currentSrc || image.src;
      previewImage.alt = image.alt;
      dialog.showModal();
    });
  });
}

const $d = document;
window.onload = function () {
  /* IMPLEMENTAR CARRUSEL DE FOTOS */
  let imagenes = [
    "img/banner-mishis1.png",
    "img/banner-mishis2.png",
    "img/banner-mishis3.png",
  ];

  let actual = 0;
  const imagen = $d.getElementById("img");
  const puntos = $d.getElementById("puntos");

  const actualizarImagen = () => {
    imagen.style.opacity = 0;
    setTimeout(() => {
      imagen.src = imagenes[actual];
      imagen.style.opacity = 1;
      actualizarPuntos();
    }, 500);
  };

  const actualizarPuntos = () => {
    puntos.innerHTML = imagenes
      .map((_, i) => `<p class="${i === actual ? "bold" : ""}">.</p>`)
      .join("");
  };

  const avanzar = () => {
    actual = (actual + 1) % imagenes.length;
    actualizarImagen();
  };

  const retroceder = () => {
    actual = (actual - 1 + imagenes.length) % imagenes.length;
    actualizarImagen();
  };

  $d.getElementById("atras").addEventListener("click", retroceder);
  $d.getElementById("adelante").addEventListener("click", avanzar);

  actualizarPuntos();
  setInterval(avanzar, 7000);

  let slideIndex = 0;

  function moveSlide(n) {
    const slides = document.querySelectorAll(".carousel-slide img");
    slideIndex += n;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
  }
  $d.getElementById("prevBtn").addEventListener("click", () => {
    moveSlide(-1);
  });
  $d.getElementById("nextBtn").addEventListener("click", () => {
    moveSlide(1);
  });
};

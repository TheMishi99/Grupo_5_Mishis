const $d = document;
window.onload = function () {
  let imagenes = [
    "img/banner-mishis1.png",
    "img/banner-mishis2.png",
    "img/banner-mishis3.png",
  ];

  let actual = 0;
  const imagen = $d.getElementById("img");
  const puntos = $d.getElementById("puntos");
  
  const actualizarImagen = () => {
    imagen.src = imagenes[actual];
    actualizarPuntos();
  };
  
  const actualizarPuntos = () => {
    puntos.innerHTML = imagenes.map((_, i) => `<p class="${i === actual ? 'bold' : ''}">.</p>`).join('');
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
  setInterval(avanzar, 5000); // Cambia de imagen automáticamente cada 5 segundos
};
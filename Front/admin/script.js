
//LOGICA DE ICONO BRILLO
const btnBrillo = document.getElementById('brightness-icon');
const menuBrillo = document.getElementById('brightness-ctrl');
const barraBrillo = document.getElementById('brightness-range');
// A. Mostrar/Ocultar el menú al hacer clic
btnBrillo.addEventListener('click', (e) => {
  e.preventDefault();
  menuBrillo.classList.toggle('show');
});

// B. Cambiar el brillo de la página
barraBrillo.addEventListener('input', (e) => {
  const valor = e.target.value; // Obtenemos el número (10 a 100)
  // Aplicamos el filtro al body. Dividimos por 100 para que sea decimal (ej: 0.7)
  document.body.style.filter = `brightness(${valor}%)`;
});
const contenedorBrillo = document.querySelector('.brightness-container');
// Cerrar el menú si se hace clic fuera de él
document.addEventListener('click', (e) => {
  // El signo "!" significa "NO"
  if (!contenedorBrillo.contains(e.target)) {
    menuBrillo.classList.remove('show');
  }
});
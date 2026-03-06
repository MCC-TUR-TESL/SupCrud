
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

async function loadFirebaseConfig() {
  const response = await fetch("http://localhost:3003/firebase-config");
  if (!response.ok) {
    throw new Error("No se pudo obtener la configuración de Firebase");
  }
  return await response.json();
}

// ==========================
// INICIALIZAR FIREBASE
// ==========================
async function initApp() {
  try {
    const firebaseConfig = await loadFirebaseConfig();

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    window.auth = firebase.auth();
    console.log("✅ Firebase inicializado");

    setupAuthListener();
    setupLogoutButton();

  } catch (error) {
    console.error("Error inicializando Firebase:", error);
  }
}

initApp();

// ==========================
// AUTH LISTENER
// ==========================
function setupAuthListener() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "../../index.html";
      return;
    }

    const avatar = document.getElementById("userAvatar");
    const name = document.getElementById("userName");
    const email = document.getElementById("userEmail");

    if (name) name.textContent = user.displayName || "Usuario";
    if (email) email.textContent = user.email;

    if (avatar) {
      avatar.textContent = (
        user.displayName?.charAt(0) ||
        user.email?.charAt(0) ||
        "U"
      ).toUpperCase();
    }
  });
}

// ==========================
// 🔑 LOGOUT
// ==========================
function setupLogoutButton() {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("dashboardEmails");
      auth.signOut()
        .then(() => window.location.href = "../../index.html")
        .catch(err => console.error("Error cerrando sesión:", err));
    });
  }
}
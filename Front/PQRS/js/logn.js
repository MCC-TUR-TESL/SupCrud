// 🔹 OBTENER CONFIGURACIÓN DESDE EL BACKEND
async function loadFirebaseConfig() {
  const response = await fetch("http://localhost:3003/firebase-config");

  if (!response.ok) {
    throw new Error("No se pudo obtener la configuración de Firebase");
  }

  return await response.json();
}

// 🔥 INICIALIZAR APP
async function initApp() {
  try {
    const firebaseConfig = await loadFirebaseConfig();

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    window.auth = firebase.auth();
    window.db = firebase.firestore();
    window.provider = new firebase.auth.GoogleAuthProvider();

    console.log("✅ Firebase inicializado");

    setupLogin();

  } catch (error) {
    console.error("Error inicializando Firebase:", error);
  }
}

initApp();

let currentUser = null;

// 🔐 LOGIN CON GOOGLE + CLASIFICACIÓN COMPLETA
function setupLogin() {
  document.getElementById("loginBtn")?.addEventListener("click", async () => {
    try {

      Swal.fire({
        title: "Conectando...",
        html: "Iniciando sesión",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      // 🔐 LOGIN GOOGLE
      const result = await auth.signInWithPopup(provider);
      currentUser = result.user;

      await db.collection("users").doc(currentUser.uid).set({
        email: currentUser.email,
        name: currentUser.displayName,
        createdAt: new Date(),
      });

      setTimeout(() => {
        window.location.href = "./index.html";
      }, 2000);

      return;
    } catch (error) {
      console.error("Error en login:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
    }
  })

  // 🔥 CLASIFICACIÓN EN LOTE
  //     const batchRes = await fetch("http://localhost:3000/classify-emails", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         emails: emails.map(m => ({
  //           subject: m.subject || "",
  //           text: m.text || ""
  //         }))
  //       }),
  //     });

  //     if (!batchRes.ok) {
  //       throw new Error(`Error backend: ${batchRes.status}`);
  //     }

  //     const batchData = await batchRes.json();

  //     const colorMap = {
  //       alertas: "secondary",
  //       reunion: "warning",
  //       faltas_justificadas: "success",
  //       faltas_injustificadas: "danger",
  //       importantes: "info",
  //     };

  //     // 🔥 PROCESAR Y FILTRAR ALERTAS AQUÍ
  //     const processedEmails = emails
  //       .map((mail, index) => {
  //         const tag = batchData[index]?.tag || "importantes";

  //         return {
  //           ...mail,
  //           tag,
  //           colorClass: colorMap[tag] || "info",
  //           revisado: false,
  //         };
  //       })
  //       .filter(mail => mail.tag !== "alertas");

  //     localStorage.setItem("dashboardEmails", JSON.stringify(processedEmails));

  //     Swal.close();

  //     window.location.href = "./windows/dashboard/dashboard.html";

  //   } catch (error) {

  //     console.error("Error en login:", error);

  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message
  //     });
  //   }
  // });
}
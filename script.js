// ==== MENÚ ACTIVO ====
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ==== MENÚ DESPLEGABLE EN MÓVILES ====
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// ==== SALUDO PERSONALIZADO Y SESIÓN ====
const userGreeting = document.getElementById("user-greeting");
function mostrarSaludo() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.name) {
    userGreeting.textContent = `👋 Hola, ${user.name}`;
  } else {
    userGreeting.textContent = "";
  }
}

// ==== REGISTRO ====
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("nombreRegistro").value.trim();
    const email = document.getElementById("emailRegistro").value.trim();
    const password = document.getElementById("passRegistro").value.trim();

    if (!name || !email.includes("@") || password.length < 6) {
      alert("⚠️ Verifica tus datos. La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const user = { name, email, password, intereses: "", foto: "" };
    localStorage.setItem("user", JSON.stringify(user));
    alert(`✅ Registro exitoso. ¡Bienvenido, ${name}!`);
    mostrarSaludo();
  });
}

// ==== LOGIN ====
const logForm = document.getElementById("loginForm");
if (logForm) {
  logForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passLogin").value.trim();
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      alert(`🔓 Bienvenido de nuevo, ${user.name}`);
      mostrarSaludo();
    } else {
      alert("❌ Credenciales incorrectas o usuario no registrado.");
    }
  });
}

// ==== PERFIL ====
const perfilForm = document.getElementById("perfilForm");
const editarPerfilBtn = document.getElementById("editarPerfil");
const borrarPerfilBtn = document.getElementById("borrarPerfil");
const fotoInput = document.getElementById("foto");

function cargarPerfil() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("nombre").value = user.name || "";
    document.getElementById("intereses").value = user.intereses || "";
  }
}

if (perfilForm) {
  perfilForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("nombre").value.trim();
    const intereses = document.getElementById("intereses").value.trim();
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("⚠️ Debes iniciar sesión o registrarte primero.");
      return;
    }

    user.name = name || user.name;
    user.intereses = intereses;
    localStorage.setItem("user", JSON.stringify(user));
    alert("✅ Perfil actualizado correctamente.");
    mostrarSaludo();
  });
}

if (editarPerfilBtn) {
  editarPerfilBtn.addEventListener("click", () => {
    perfilForm.querySelectorAll("input, textarea").forEach(el => el.disabled = false);
    alert("✏️ Modo edición activado. Puedes cambiar tus datos.");
  });
}

if (borrarPerfilBtn) {
  borrarPerfilBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    perfilForm.reset();
    userGreeting.textContent = "";
    alert("🗑️ Perfil eliminado correctamente.");
  });
}

// ==== FOTO DE PERFIL ====
if (fotoInput) {
  fotoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.foto = event.target.result;
        localStorage.setItem("user", JSON.stringify(user));
      };
      reader.readAsDataURL(file);
      alert("🖼️ Foto de perfil actualizada.");
    }
  });
}

// ==== LEER MÁS EN ARTÍCULOS (ABRE EN NUEVA PESTAÑA) ====
const botonesLeerMas = document.querySelectorAll(".leer-mas");
botonesLeerMas.forEach(boton => {
  boton.addEventListener("click", e => {
    e.preventDefault();
    const link = boton.dataset.link;
    if (link) window.open(link, "_blank");
  });
});

// ==== CARRUSEL ====
let index = 0;
const images = document.querySelectorAll('.carousel img');
function nextSlide() {
  if (images.length > 0) {
    index = (index + 1) % images.length;
    document.querySelector('.carousel').style.transform = `translateX(-${index * 100}%)`;
  }
}
setInterval(nextSlide, 4000);

// ==== ANIMACIÓN DE ENTRADA PARA VIDEOS ====
const videoCards = document.querySelectorAll(".video-card");
function mostrarVideos() {
  videoCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", mostrarVideos);
window.addEventListener("load", () => {
  mostrarVideos();
  cargarPerfil();
  mostrarSaludo();
});


document.addEventListener("DOMContentLoaded", () => {
  const userGreeting = document.getElementById("user-greeting");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Mostrar saludo si hay usuario guardado
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.name) {
    mostrarSaludo(storedUser.name);
  }

  // Registro de usuario
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("nombreRegistro").value.trim();
    const email = document.getElementById("emailRegistro").value.trim();
    const password = document.getElementById("passRegistro").value.trim();

    if (name && email && password) {
      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      mostrarSaludo(name);
      alert("Registro exitoso. ¡Bienvenido, " + name + "!");
    }
  });

  // Inicio de sesión
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passLogin").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      mostrarSaludo(storedUser.name);
      alert("Inicio de sesión exitoso. ¡Hola, " + storedUser.name + "!");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });

  // Mostrar saludo y botón de cerrar sesión
  function mostrarSaludo(nombre) {
    userGreeting.innerHTML = `
      <span>Hola, ${nombre}</span>
      <button id="logoutBtn" class="logout-btn">Cerrar sesión</button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", cerrarSesion);
  }

  // Cerrar sesión
  function cerrarSesion() {
    localStorage.removeItem("user");
    userGreeting.innerHTML = "";
    alert("Has cerrado sesión correctamente.");
  }
});





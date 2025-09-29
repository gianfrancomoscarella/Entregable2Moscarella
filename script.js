let listaCanciones = [];

const salida = document.getElementById("salida");
const mensajes = document.getElementById("mensajes");

const modal = document.getElementById("modalSalir");
const btnConfirmar = document.getElementById("confirmarSalir");
const btnCancelar = document.getElementById("cancelarSalir");
const btnDarkMode = document.getElementById("btnDarkMode");

const isAlpha = str => /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ0-9\s\-']+$/.test(str);
const isDuracion = str => /^\d+:[0-5]\d$/.test(str);

function mostrarMensaje(texto, tipo = "info") {
    mensajes.textContent = texto;
    mensajes.style.color = tipo === "error" ? "red" : "green";
    setTimeout(() => mensajes.textContent = "", 10000); 
}

function guardarLista() {
    localStorage.setItem('listaCanciones', JSON.stringify(listaCanciones));
}

function cargarLista() {
    const data = localStorage.getItem('listaCanciones');
    if (data) listaCanciones = JSON.parse(data);
}
cargarLista();

function agregarCancion() {
    const titulo = document.getElementById("titulo").value.trim();
    const artista = document.getElementById("artista").value.trim();
    const duracion = document.getElementById("duracion").value.trim();

    if (!isAlpha(titulo) || titulo.length <= 4) {
        mostrarMensaje("❌ Título inválido (mínimo 5 caracteres)", "error");
        return;
    }
    if (!isAlpha(artista) || artista.length < 2) {
        mostrarMensaje("❌ Artista inválido (mínimo 2 caracteres)", "error");
        return;
    }
    if (!isDuracion(duracion)) {
        mostrarMensaje("❌ Duración inválida (formato mm:ss)", "error");
        return;
    }

    listaCanciones.push({ titulo, artista, duracion });
    guardarLista();
    mostrarMensaje("✅ Canción agregada correctamente");


    document.getElementById("titulo").value = "";
    document.getElementById("artista").value = "";
    document.getElementById("duracion").value = "";
}

function mostrarListaCanciones() {
    if (listaCanciones.length === 0) {
        salida.textContent = "No hay canciones guardadas";
    } else {
        salida.textContent = listaCanciones
            .map((c, i) => `${i + 1}. ${c.titulo} - ${c.artista} (${c.duracion})`)
            .join("\n");
    }
    salida.scrollTop = 0;
}

function buscarCancionPorTitulo() {
    const tituloBuscado = document.getElementById("titulo").value.trim().toLowerCase();
    if (!tituloBuscado) {
        mostrarMensaje("⚠️ Ingrese un título en el campo correspondiente", "error");
        return;
    }

    const cancionesEncontradas = listaCanciones.filter(c =>
        c.titulo.toLowerCase().includes(tituloBuscado)
    );

    if (cancionesEncontradas.length > 0) {
        salida.textContent = cancionesEncontradas
            .map(c => `🎵 ${c.titulo} - ${c.artista} (${c.duracion})`)
            .join("\n");
    } else {
        salida.textContent = "Canción no encontrada";
    }
    salida.scrollTop = 0;
}

function mostrarCancionesLargas() {
    const cancionesLargas = listaCanciones.filter(c => {
        const [min, seg] = c.duracion.split(":").map(Number);
        return min * 60 + seg > 300;
    });

    if (cancionesLargas.length === 0) {
        salida.textContent = "No hay canciones largas (>5 min)";
    } else {
        salida.textContent = cancionesLargas
            .map(c => `🎵 ${c.titulo} - ${c.artista} (${c.duracion})`)
            .join("\n");
    }
    salida.scrollTop = 0;
}

function confirmacionSalir() {
    modal.style.display = "flex";
    document.body.classList.add('modal-abierto');
}

btnConfirmar.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove('modal-abierto');
    salida.textContent = "👋 Saliendo...";
    mostrarMensaje("");
});

btnCancelar.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove('modal-abierto');
});

if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark');
    btnDarkMode.textContent = "☀️ Modo Claro";
}

btnDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const esDark = document.body.classList.contains("dark");
    btnDarkMode.textContent = esDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
    localStorage.setItem('modoOscuro', esDark);
});

document.getElementById("btnAgregar").addEventListener("click", agregarCancion);
document.getElementById("btnMostrar").addEventListener("click", mostrarListaCanciones);
document.getElementById("btnBuscar").addEventListener("click", buscarCancionPorTitulo);
document.getElementById("btnLargas").addEventListener("click", mostrarCancionesLargas);
document.getElementById("btnSalir").addEventListener("click", confirmacionSalir);

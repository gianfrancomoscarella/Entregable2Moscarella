let listaCanciones = [];

const salida = document.getElementById("salida");

const isAlpha = str => /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(str);

function validarTitulo() {
    let titulo = prompt("Ingrese el título");
    if (isAlpha(titulo) && titulo.length > 4) {
        return titulo.trim();
    } else {
        alert("Título inválido, reingrese el título");
        return validarTitulo();
    }
}

function validarArtista() {
    let artista = prompt("Ingrese el artista");
    if (isAlpha(artista) && artista.length >= 2) {
        return artista.trim();
    } else {
        alert("Artista inválido, reingrese el artista");
        return validarArtista();
    }
}

const isDuracion = str => /^\d+:[0-5]\d$/.test(str);

function validarDuracion() {
    let duracion = prompt("Ingrese la duración (mm:ss)");
    if (isDuracion(duracion)) {
        return duracion.trim();
    } else {
        alert("Duración inválida, reingrese la duración");
        return validarDuracion();
    }
}

function agregarCancion() {
    const titulo = validarTitulo();
    const artista = validarArtista();
    const duracion = validarDuracion();

    listaCanciones.push({ titulo, artista, duracion });
    alert("Canción agregada correctamente");
}

function mostrarListaCanciones() {
    if (listaCanciones.length === 0) {
        salida.textContent = "No hay canciones guardadas";
    } else {
        let texto = "Canciones guardadas:\n";
        listaCanciones.forEach((c, i) => {
            texto += `${i + 1}. ${c.titulo} - ${c.artista} (${c.duracion})\n`;
        });
        salida.textContent = texto;
    }
}

function buscarCancionPorTitulo() {
    const tituloBuscado = prompt("Ingrese el título de la canción a buscar:");
    const cancion = listaCanciones.find(c => c.titulo.toLowerCase() === tituloBuscado.toLowerCase());

    if (cancion) {
        salida.textContent = `Canción encontrada:\nTítulo: ${cancion.titulo}\nArtista: ${cancion.artista}\nDuración: ${cancion.duracion}`;
    } else {
        salida.textContent = "Canción no encontrada";
    }
}

function mostrarCancionesLargas() {
    const cancionesLargas = listaCanciones.filter(c => {
        const partes = c.duracion.split(":");
        const segundosTotales = parseInt(partes[0]) * 60 + parseInt(partes[1]);
        return segundosTotales > 300;
    });

    if (cancionesLargas.length === 0) {
        salida.textContent = "No hay canciones largas (>5 min)";
    } else {
        let texto = "Canciones largas (>5 min):\n";
        cancionesLargas.forEach(c => {
            texto += `Título: ${c.titulo} - Artista: ${c.artista} - Duración: ${c.duracion}\n`;
        });
        salida.textContent = texto;
    }
}

function confirmacionSalir() {
    if (confirm("¿Estás seguro de que quieres salir?")) {
        salida.textContent = "Saliendo...";
    }
}

document.getElementById("btnAgregar").addEventListener("click", agregarCancion);
document.getElementById("btnMostrar").addEventListener("click", mostrarListaCanciones);
document.getElementById("btnBuscar").addEventListener("click", buscarCancionPorTitulo);
document.getElementById("btnLargas").addEventListener("click", mostrarCancionesLargas);
document.getElementById("btnSalir").addEventListener("click", confirmacionSalir);

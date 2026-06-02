const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "index.html";
}

function parseJwt(token) {
    try {
        const partes = token.split('.');
        const base64Url = partes[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
}

const usuario = parseJwt(token);

if (!usuario) {
    alert("Sesión inválida");
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

const infoUsuarioContenedor = document.getElementById("infoUsuario");
if (infoUsuarioContenedor && usuario) {
    infoUsuarioContenedor.innerHTML = `
        <p class="mb-1"><strong>ID de Usuario:</strong> ${usuario.id}</p>
        <p class="mb-0"><strong>Rol asignado:</strong> <span class="badge bg-primary fs-6">${usuario.rol}</span></p>
    `;
}

function cargarEstadisticas() {
    const txtEstudiantes = document.getElementById("total-estudiantes");
    const txtProfesores = document.getElementById("total-profesores");
    const txtCalificaciones = document.getElementById("total-calificaciones");

    const datosSimulados = {
        totalEstudiantes: 42,
        totalProfesores: 12,
        totalCalificaciones: 156
    };

    if (txtEstudiantes) txtEstudiantes.innerText = datosSimulados.totalEstudiantes;
    if (txtProfesores) txtProfesores.innerText = datosSimulados.totalProfesores;
    if (txtCalificaciones) txtCalificaciones.innerText = datosSimulados.totalCalificaciones;
}

// RESTRICCIÓN CORREGIDA Y BLINDADA CONTRA ERRORES
function aplicarFiltroDeRoles() {
    if (!usuario || !usuario.rol) return;

    console.log("Rol actual detectado:", usuario.rol); // Esto te mostrará en F12 qué rol lee

    if (usuario.rol === "Estudiante") {
        const linkEst = document.querySelector("a[href='estudiantes.html']");
        const linkProf = document.querySelector("a[href='profesores.html']");
        if (linkEst) linkEst.remove();
        if (linkProf) linkProf.remove();
    } 
    else if (usuario.rol === "Profesor") {
        const linkProf = document.querySelector("a[href='profesores.html']");
        if (linkProf) linkProf.remove(); // SOLO se borra si encuentra el enlace y si eres Profesor
    } 
    else if (usuario.rol === "Administrador") {
        // Al Administrador NO se le borra NADA. Obligamos a cargar las tarjetas y mostrarlas
        cargarEstadisticas();
        const panelStats = document.getElementById("contenedor-estadisticas");
        if (panelStats) {
            panelStats.style.setProperty("display", "flex", "important");
        }
    }
}

// Ejecutar la restricción de forma segura
aplicarFiltroDeRoles();

function cerrarSesion() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

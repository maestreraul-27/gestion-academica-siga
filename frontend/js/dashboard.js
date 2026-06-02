const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "index.html";
}

// FUNCIÓN CORREGIDA AL 100%: Lee el payload del token de forma instantánea
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]; // Corrección clave: añadimos [1]
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

// Inyectar datos del usuario en la tarjeta de bienvenida
const infoUsuarioContenedor = document.getElementById("infoUsuario");
if (infoUsuarioContenedor && usuario) {
    infoUsuarioContenedor.innerHTML = `
        <p class="mb-1"><strong>ID de Usuario:</strong> ${usuario.id}</p>
        <p class="mb-0"><strong>Rol asignado:</strong> <span class="badge bg-primary fs-6">${usuario.rol}</span></p>
    `;
}

// Cargar estadísticas solo para el Administrador
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

// FILTRO DE ROLES UNIFICADO: Asegura los accesos correctos sin duplicados
function aplicarFiltroDeRoles() {
    if (!usuario) return;

    if (usuario.rol === "Estudiante") {
        const linkEst = document.querySelector("a[href='estudiantes.html']");
        const linkProf = document.querySelector("a[href='profesores.html']");
        if (linkEst) linkEst.remove();
        if (linkProf) linkProf.remove();
    } 
    else if (usuario.rol === "Profesor") {
        const linkProf = document.querySelector("a[href='profesores.html']");
        if (linkProf) linkProf.remove();
    } 
    else if (usuario.rol === "Administrador") {
        // El administrador ve todo, cargamos datos y hacemos visible el contenedor oculto en el HTML
        cargarEstadisticas();
        const panelStats = document.getElementById("contenedor-estadisticas");
        if (panelStats) {
            panelStats.style.setProperty("display", "flex", "important");
        }
    }
}

// ORDEN DE EJECUCIÓN: Obligatoria para que el filtro corra al cargar la página
aplicarFiltroDeRoles();

// Lógica para destruir la sesión activa
function cerrarSesion() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

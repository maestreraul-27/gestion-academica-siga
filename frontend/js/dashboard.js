const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "index.html";
}

function parseJwt(token) {
    try {
        const base64 = token.split('.')[1];
        const payload = atob(base64);
        return JSON.parse(payload);
    } catch (error) {
        return null;
    }
}

const usuario = parseJwt(token);

if (!usuario) {
    alert("Sesión inválida");
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

document.getElementById("infoUsuario").innerHTML = `
    <p class="mb-1"><strong>ID de Usuario:</strong> ${usuario.id}</p>
    <p class="mb-0"><strong>Rol asignado:</strong> <span class="badge bg-primary fs-6">${usuario.rol}</span></p>
`;

function cargarEstadisticas() {

    const datosSimulados = {
        totalEstudiantes: 42,
        totalProfesores: 12,
        totalCalificaciones: 156
    };

    document.getElementById("total-estudiantes").innerText = datosSimulados.totalEstudiantes;
    document.getElementById("total-profesores").innerText = datosSimulados.totalProfesores;
    document.getElementById("total-calificaciones").innerText = datosSimulados.totalCalificaciones;
}

cargarEstadisticas();

function cerrarSesion() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
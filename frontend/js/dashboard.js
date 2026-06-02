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
    <h3>Bienvenido</h3>
    <p><strong>ID:</strong> ${usuario.id}</p>
    <p><strong>Rol:</strong> ${usuario.rol}</p>
`;

let menu = "";

if (usuario.rol === "Administrador") {
    menu = `
        <a href="estudiantes.html">Estudiantes</a><br>
        <a href="profesores.html">Profesores</a><br>
        <a href="calificaciones.html">Calificaciones</a><br>
    `;
} 
else if (usuario.rol === "Profesor") {
    menu = `
        <a href="estudiantes.html">Estudiantes</a><br>
        <a href="calificaciones.html">Calificaciones</a><br>
    `;
} 
else if (usuario.rol === "Estudiante") {
    menu = `
        <a href="calificaciones.html">Mis Calificaciones</a><br>
    `;
}

document.getElementById("menu").innerHTML = menu;

function cerrarSesion() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "index.html";
}

const API = "http://localhost:3000/calificaciones";

function getToken() {
    return localStorage.getItem("token");
}

async function obtenerCalificaciones() {

    const res = await fetch(API, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const data = await res.json();

    const tabla = document.getElementById("tablaCalificaciones");
    tabla.innerHTML = "";

    data.forEach(e => {
        tabla.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.estudiante}</td>
                <td>${e.asignatura}</td>
                <td>${e.nota}</td>
                <td>
                    <button onclick="editarCalificacion(${e.id})">Editar</button>
                    <button onclick="eliminarCalificacion(${e.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function crearCalificacion() {

    const id = document.getElementById("id").value;
    const estudiante = document.getElementById("estudiante").value;
    const asignatura = document.getElementById("asignatura").value;
    const nota = document.getElementById("nota").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ id, estudiante, asignatura, nota })
    });

    obtenerCalificaciones();
}

function editarCalificacion(id) {

    const estudiante = prompt("Nuevo estudiante:");
    const asignatura = prompt("Nueva asignatura:");
    const nota = prompt("Nueva nota:");

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ estudiante, asignatura, nota })
    })
    .then(() => obtenerCalificaciones());
}

function eliminarCalificacion(id) {

    fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(() => obtenerCalificaciones());
}

obtenerCalificaciones();
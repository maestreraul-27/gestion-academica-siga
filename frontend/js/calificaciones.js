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
                <td class="fw-bold">${e.id}</td>
                <td>${e.estudiante}</td>
                <td>${e.asignatura}</td>
                <td><span class="badge bg-secondary fs-6">${e.nota}</span></td>
                <td>
                    <button class="btn btn-warning btn-sm me-1 px-3" onclick="editarCalificacion(${e.id})">Editar</button>
                    <button class="btn btn-danger btn-sm px-3" onclick="eliminarCalificacion(${e.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function crearCalificacion() {
    const estudiante = document.getElementById("estudiante").value.trim();
    const asignatura = document.getElementById("asignatura").value.trim();
    const nota = document.getElementById("nota").value.trim();

    if (!estudiante || !asignatura || !nota) {
        alert("Por favor, rellena todos los campos necesarios.");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ estudiante, asignatura, nota })
    });

    document.getElementById("estudiante").value = "";
    document.getElementById("asignatura").value = "";
    document.getElementById("nota").value = "";

    obtenerCalificaciones();
}

function editarCalificacion(id) {
    const estudiante = prompt("Nuevo estudiante:");
    const asignatura = prompt("Nueva asignatura:");
    const nota = prompt("Nueva nota:");

    if (estudiante === null || asignatura === null || nota === null) return;

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
    if (!confirm("¿Estás seguro de que deseas eliminar esta calificación?")) return;

    fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(() => obtenerCalificaciones());
}

obtenerCalificaciones();

const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "index.html";
}

const API = "http://localhost:3000/estudiantes";

function getToken() {
    return localStorage.getItem("token");
}

async function obtenerEstudiantes() {
    const res = await fetch(API, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const data = await res.json();

    const tabla = document.getElementById("tablaEstudiantes");
    tabla.innerHTML = "";

    data.forEach(e => {

        tabla.innerHTML += `
            <tr>
                <td class="fw-bold">${e.id}</td>
                <td>${e.nombre}</td>
                <td>${e.programa}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-1 px-3" onclick="editarEstudiante(${e.id})">Editar</button>
                    <button class="btn btn-danger btn-sm px-3" onclick="eliminarEstudiante(${e.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function crearEstudiante() {
    const nombre = document.getElementById("nombre").value.trim();
    const programa = document.getElementById("programa").value.trim();

    if (!nombre || !programa) {
        alert("Por favor, rellena todos los campos necesarios.");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ nombre, programa })
    });

    document.getElementById("nombre").value = "";
    document.getElementById("programa").value = "";

    obtenerEstudiantes();
}

function editarEstudiante(id) {
    const nombre = prompt("Nuevo nombre:");
    const programa = prompt("Nuevo programa:");

    if (nombre === null || programa === null) return;

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ nombre, programa })
    })
    .then(() => obtenerEstudiantes());
}

function eliminarEstudiante(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este estudiante?")) return;

    fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(() => obtenerEstudiantes());
}

const usuarioEstudiantes = JSON.parse(atob(localStorage.getItem("token").split('.')[1]));

if (usuarioEstudiantes.rol === "Profesor") {

    const formulario = document.querySelector(".card");
    if (formulario) formulario.remove();

    const linkProfesores = document.querySelector("a[href='profesores.html']");
    if (linkProfesores) linkProfesores.remove();
}

obtenerEstudiantes();
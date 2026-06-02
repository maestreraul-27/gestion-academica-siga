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
                <td>${e.id}</td>
                <td>${e.nombre}</td>
                <td>${e.programa}</td>
                <td>
                    <button onclick="editarEstudiante(${e.id})">Editar</button>
                    <button onclick="eliminarEstudiante(${e.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function crearEstudiante() {

    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const programa = document.getElementById("programa").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ id, nombre, programa })
    });

    obtenerEstudiantes();
}

function editarEstudiante(id) {

    const nombre = prompt("Nuevo nombre:");
    const programa = prompt("Nuevo programa:");

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

    fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(() => obtenerEstudiantes());
}
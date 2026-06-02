const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "index.html";
}

const API = "http://localhost:3000/profesores";

function getToken() {
    return localStorage.getItem("token");
}

async function obtenerProfesores() {

    const res = await fetch(API, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const data = await res.json();

    const tabla = document.getElementById("tablaProfesores");
    tabla.innerHTML = "";

    data.forEach(e => {
        tabla.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.nombre}</td>
                <td>${e.especialidad}</td>
                <td>
                    <button onclick="editarProfesor(${e.id})">Editar</button>
                    <button onclick="eliminarProfesor(${e.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function crearProfesor() {

    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const especialidad = document.getElementById("especialidad").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ id, nombre, especialidad })
    });

    obtenerProfesores();
}

function editarProfesor(id) {

    const nombre = prompt("Nuevo nombre:");
    const especialidad = prompt("Nueva especialidad:");

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ nombre, especialidad })
    })
    .then(() => obtenerProfesores());
}

function eliminarProfesor(id) {

    fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(() => obtenerProfesores());
}

obtenerProfesores();
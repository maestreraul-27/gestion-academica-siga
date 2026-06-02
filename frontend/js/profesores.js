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

    data.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td class="fw-bold">${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.especialidad}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-1 px-3" onclick="editarProfesor(${p.id})">Editar</button>
                    <button class="btn btn-danger btn-sm px-3" onclick="eliminarProfesor(${p.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function crearProfesor() {
    const nombre = document.getElementById("nombre").value.trim();
    const specialtyInput = document.getElementById("especialidad");
    const especialidad = specialtyInput ? specialtyInput.value.trim() : "";

    if (!nombre || !especialidad) {
        alert("Por favor, rellena todos los campos necesarios.");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ nombre, especialidad })
    });

    document.getElementById("nombre").value = "";
    if(specialtyInput) specialtyInput.value = "";

    obtenerProfesores();
}

function editarProfesor(id) {
    const nombre = prompt("Nuevo nombre:");
    const especialidad = prompt("Nueva especialidad:");

    if (nombre === null || especialidad === null) return;

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
    if (!confirm("¿Estás seguro de que deseas eliminar este profesor?")) return;

    fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(() => obtenerProfesores());
}

obtenerProfesores();

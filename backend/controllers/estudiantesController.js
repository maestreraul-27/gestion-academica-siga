const estudiantes = require("../models/estudiantesModel");

function obtenerEstudiantes(req, res) {
    res.json(estudiantes);
}

function obtenerEstudiante(req, res) {
    const id = parseInt(req.params.id);

    const estudiante = estudiantes.find(e => e.id === id);

    if (!estudiante) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
    }

    res.json(estudiante);
}

function crearEstudiante(req, res) {
    const { nombre, programa } = req.body;

    const nuevoId = estudiantes.length > 0 
        ? estudiantes[estudiantes.length - 1].id + 1 
        : 1;

    const nuevoEstudiante = {
        id: nuevoId,
        nombre,
        programa
    };

    estudiantes.push(nuevoEstudiante);

    res.status(201).json(nuevoEstudiante);
}


function actualizarEstudiante(req, res) {
    const id = parseInt(req.params.id);

    const estudiante = estudiantes.find(e => e.id === id);

    if (!estudiante) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
    }

    estudiante.nombre = req.body.nombre;
    estudiante.programa = req.body.programa;

    res.json(estudiante);
}

function eliminarEstudiante(req, res) {
    const id = parseInt(req.params.id);

    const indice = estudiantes.findIndex(e => e.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
    }

    estudiantes.splice(indice, 1);

    res.json({
        mensaje: "Estudiante eliminado correctamente"
    });
}

module.exports = {
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};
const calificaciones = require("../models/calificacionesModel");

function obtenerCalificaciones(req, res) {
    res.json(calificaciones);
}

function obtenerCalificacion(req, res) {
    const id = parseInt(req.params.id);

    const calificacion = calificaciones.find(c => c.id === id);

    if (!calificacion) {
        return res.status(404).json({
            mensaje: "Calificación no encontrada"
        });
    }

    res.json(calificacion);
}

function crearCalificacion(req, res) {
    const { estudiante, asignatura, nota } = req.body;

    const nuevoId = calificaciones.length > 0 
        ? calificaciones[calificaciones.length - 1].id + 1 
        : 1;

    const nuevaCalificacion = {
        id: nuevoId,
        estudiante,
        asignatura,
        nota: parseInt(nota)
    };

    calificaciones.push(nuevaCalificacion);
    res.status(201).json(nuevaCalificacion);
}


function actualizarCalificacion(req, res) {
    const id = parseInt(req.params.id);

    const calificacion = calificaciones.find(c => c.id === id);

    if (!calificacion) {
        return res.status(404).json({
            mensaje: "Calificación no encontrada"
        });
    }

    calificacion.estudiante = req.body.estudiante;
    calificacion.asignatura = req.body.asignatura;
    calificacion.nota = req.body.nota;

    res.json(calificacion);
}

function eliminarCalificacion(req, res) {
    const id = parseInt(req.params.id);

    const indice = calificaciones.findIndex(c => c.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Calificación no encontrada"
        });
    }

    calificaciones.splice(indice, 1);

    res.json({
        mensaje: "Calificación eliminada correctamente"
    });
}

module.exports = {
    obtenerCalificaciones,
    obtenerCalificacion,
    crearCalificacion,
    actualizarCalificacion,
    eliminarCalificacion
};
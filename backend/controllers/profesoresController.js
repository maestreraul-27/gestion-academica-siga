const profesores = require("../models/profesoresModel");

function obtenerProfesores(req, res) {
    res.json(profesores);
}

function obtenerProfesor(req, res) {
    const id = parseInt(req.params.id);

    const profesor = profesores.find(p => p.id === id);

    if (!profesor) {
        return res.status(404).json({
            mensaje: "Profesor no encontrado"
        });
    }

    res.json(profesor);
}

function crearProfesor(req, res) {
    const { nombre, especialidad } = req.body;

    const nuevoId = profesores.length > 0 
        ? profesores[profesores.length - 1].id + 1 
        : 1;

    const nuevoProfesor = {
        id: nuevoId,
        nombre,
        especialidad
    };

    profesores.push(nuevoProfesor);
    res.status(201).json(nuevoProfesor);
}

function actualizarProfesor(req, res) {
    const id = parseInt(req.params.id);

    const profesor = profesores.find(p => p.id === id);

    if (!profesor) {
        return res.status(404).json({
            mensaje: "Profesor no encontrado"
        });
    }

    profesor.nombre = req.body.nombre;
    profesor.especialidad = req.body.especialidad;

    res.json(profesor);
}

function eliminarProfesor(req, res) {
    const id = parseInt(req.params.id);

    const indice = profesores.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Profesor no encontrado"
        });
    }

    profesores.splice(indice, 1);

    res.json({
        mensaje: "Profesor eliminado correctamente"
    });
}

module.exports = {
    obtenerProfesores,
    obtenerProfesor,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
};
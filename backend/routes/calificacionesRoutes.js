const express = require("express");

const {
    obtenerCalificaciones,
    obtenerCalificacion,
    crearCalificacion,
    actualizarCalificacion,
    eliminarCalificacion
} = require("../controllers/calificacionesController");

const validarCalificacion = require("../middleware/validarCalificacion");

const verificarToken = require("../middleware/verificarToken");
const verificarRol = require("../middleware/verificarRol");

const router = express.Router();


router.get(
    "/",
    verificarToken,
    verificarRol("Administrador", "Profesor"),
    obtenerCalificaciones
);


router.get(
    "/:id",
    verificarToken,
    verificarRol("Administrador", "Profesor", "Estudiante"),
    obtenerCalificacion
);


router.post(
    "/",
    verificarToken,
    verificarRol("Administrador", "Profesor"),
    validarCalificacion,
    crearCalificacion
);


router.put(
    "/:id",
    verificarToken,
    verificarRol("Administrador", "Profesor"),
    validarCalificacion,
    actualizarCalificacion
);


router.delete(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    eliminarCalificacion
);

module.exports = router;
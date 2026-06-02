const express = require("express");

const {
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} = require("../controllers/estudiantesController");

const validarEstudiante = require("../middleware/validarEstudiante");

const verificarToken = require("../middleware/verificarToken");
const verificarRol = require("../middleware/verificarRol");

const router = express.Router();


router.get(
    "/",
    verificarToken,
    verificarRol("Administrador", "Profesor"),
    obtenerEstudiantes
);


router.get(
    "/:id",
    verificarToken,
    verificarRol("Administrador", "Profesor", "Estudiante"),
    obtenerEstudiante
);


router.post(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    validarEstudiante,
    crearEstudiante
);


router.put(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    validarEstudiante,
    actualizarEstudiante
);


router.delete(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    eliminarEstudiante
);

module.exports = router;
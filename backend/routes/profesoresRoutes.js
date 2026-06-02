const express = require("express");

const {
    obtenerProfesores,
    obtenerProfesor,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
} = require("../controllers/profesoresController");

const validarProfesor = require("../middleware/validarProfesor");

const verificarToken = require("../middleware/verificarToken");
const verificarRol = require("../middleware/verificarRol");

const router = express.Router();


router.get(
    "/",
    verificarToken,
    verificarRol("Administrador", "Profesor"),
    obtenerProfesores
);


router.get(
    "/:id",
    verificarToken,
    verificarRol("Administrador", "Profesor", "Estudiante"),
    obtenerProfesor
);


router.post(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    validarProfesor,
    crearProfesor
);


router.put(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    validarProfesor,
    actualizarProfesor
);


router.delete(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    eliminarProfesor
);

module.exports = router;
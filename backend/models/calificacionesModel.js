const express = require("express");

const {
    obtenerProfesores,
    obtenerProfesor,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
} = require("../controllers/profesoresController");

const router = express.Router();

router.get("/", obtenerProfesores);

router.post("/", crearProfesor);

router.get("/:id", obtenerProfesor);

router.put("/:id", actualizarProfesor);

router.delete("/:id", eliminarProfesor);

module.exports = router;
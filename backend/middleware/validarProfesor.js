function validarProfesor(req, res, next) {
    const { nombre, especialidad } = req.body;

    if (!nombre || !especialidad) {
        return res.status(400).json({
            mensaje: "Nombre y especialidad son obligatorios"
        });
    }

    next();
}

module.exports = validarProfesor;
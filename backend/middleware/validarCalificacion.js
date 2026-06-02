function validarCalificacion(req, res, next) {
    const { estudiante, asignatura, nota } = req.body;

    if (!estudiante || !asignatura || nota === undefined) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    next();
}

module.exports = validarCalificacion;
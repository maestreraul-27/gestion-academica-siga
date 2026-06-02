function validarEstudiante(req, res, next) {
    const { nombre, programa } = req.body;

    if (!nombre || !programa) {
        return res.status(400).json({
            mensaje: "Nombre y programa son obligatorios"
        });
    }

    next();
}

module.exports = validarEstudiante;
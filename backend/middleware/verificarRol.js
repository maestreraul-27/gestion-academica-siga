function verificarRol(...rolesPermitidos) {

    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(401).json({
                mensaje: "No hay usuario autenticado"
            });
        }

        const rolUsuario = req.usuario.rol;

        const tienePermiso = rolesPermitidos.includes(rolUsuario);

        if (!tienePermiso) {
            return res.status(403).json({
                mensaje: "No tienes permisos para esta acción"
            });
        }

        next();
    };
}

module.exports = verificarRol;
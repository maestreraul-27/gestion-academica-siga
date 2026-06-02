const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: "Token requerido"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const usuario = jwt.verify(
            token,
            "mi_clave_secreta"
        );

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(403).json({
            mensaje: "Token inválido"
        });

    }
}

module.exports = verificarToken;
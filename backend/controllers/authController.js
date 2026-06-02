const jwt = require("jsonwebtoken");
const usuarios = require("../models/usuariosModel");

function login(req, res) {
    const { usuario, password } = req.body;

    const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuario && u.password === password
    );

    if (!usuarioEncontrado) {
        return res.status(401).json({
            mensaje: "Credenciales incorrectas"
        });
    }

    const token = jwt.sign(
        {
            id: usuarioEncontrado.id,
            rol: usuarioEncontrado.rol
        },
        "mi_clave_secreta",
        {
            expiresIn: "1h"
        }
    );

    res.json({
        mensaje: "Login exitoso",
        token
    });
}

module.exports = {
    login
};
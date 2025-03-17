const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

    const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordMatch) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

    res.json({ mensaje: 'Login exitoso', usuario });
};

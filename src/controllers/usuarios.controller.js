const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.model');
require('dotenv').config();

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña, rol } = req.body;

        if (!['admin', 'vendedor'].includes(rol)) {
            return res.status(400).json({ mensaje: 'Rol inválido' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({ nombre, email, password: hashedPassword, rol });

        res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, rol: usuario.rol });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
};

module.exports = { registrarUsuario, loginUsuario };

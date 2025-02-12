const Usuario = require('../models/Usuario'); // Asegúrate de que estás importando el modelo de usuario correctamente

// Middleware para verificar si el usuario es vendedor
const checkVendedor = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login'); // Si no está autenticado, redirige al login
    }

    try {
        const usuario = await Usuario.findOne({
            where: { id: req.user.id }
        });

        if (!usuario || usuario.rol !== 'vendedor') {
            return res.status(403).json({ message: 'Acceso denegado' }); // Si no es vendedor, denegamos el acceso
        }

        next(); // Si es vendedor, pasa a la siguiente función
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Middleware para verificar si el usuario es admin
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.rol === 'admin') {
        return next(); // Si es admin, deja pasar
    } else {
        return res.status(403).json({ message: 'Acceso denegado: solo administradores pueden realizar esta acción.' }); // Si no es admin, denegamos el acceso
    }
}

module.exports = { checkVendedor, isAdmin };

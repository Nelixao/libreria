const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../models'); // Asegúrate de que el modelo esté bien importado

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'contraseña'
}, async (email, contraseña, done) => {
  try {
    const usuario = await models.Usuario.findOne({ where: { email } });

    if (!usuario) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    // Verificar rol del usuario (solo permitir vendedor o admin)
    if (usuario.rol !== 'vendedor' && usuario.rol !== 'admin') {
      return done(null, false, { message: 'Acceso denegado: rol no autorizado' });
    }

    // Comparar contraseñas encriptadas con bcrypt
    const match = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!match) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }

    return done(null, usuario);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id); // Aquí se usa la variable 'usuario' que es correcta
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await models.Usuario.findByPk(id);
    done(null, usuario); // También se usa 'usuario' aquí
  } catch (error) {
    done(error);
  }
});

module.exports = passport;

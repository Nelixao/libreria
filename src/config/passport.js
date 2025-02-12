const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { Usuario } = require('../models/Usuario');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'contraseña',
}, async (email, contraseña, done) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }

    return done(null, usuario);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id); // Guardamos el ID en la sesión
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findByPk(id); // Recuperamos el usuario por ID
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;

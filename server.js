const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('./src/config/passport');
const sequelize = require('./src/config/database');


const Libro = require('./src/models/Libro.model');

const Usuario = require('./src/models/Usuario'); // O el nombre correcto del archivo



const { checkAuth, checkRole, isAdmin } = require('./src/middleware/auth'); // Middleware de autenticación

dotenv.config();

const app = express();

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesión con seguridad mejorada
app.use(session({
  secret: process.env.SESSION_SECRET || 'ximenaalonso',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 3600000 // 1 hora de expiración
  }
}));

// Inicializar Passport y sesiones
app.use(passport.initialize());
app.use(passport.session());

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la aplicación
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'login.html')));
app.get('/dashboard', checkAuth, (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'dashboard.html')));

// Ruta de login
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect(user.rol === 'vendedor' ? '/editor' : '/index');
    });
  })(req, res, next);
});

// Rutas protegidas con autenticación y roles
app.get('/admin', isAdmin, (req, res) => {
  res.send('Bienvenido, administrador');
});

app.get('/perfil', checkAuth, (req, res) => {
  res.send('Bienvenido a tu perfil');
});

app.get('/editor', checkRole('vendedor'), (req, res) => {
  res.send('Bienvenido, vendedor');
});

// Rutas de API
const categoriasRoutes = require('./src/routes/categorias.routes');
const librosRoutes = require('./src/routes/libros.routes');
app.use('/api/categorias', categoriasRoutes);
app.use('/api/libros', librosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión exitosa a la base de datos');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error en la base de datos:', err);
    process.exit(1); // Detener el proceso si hay error en la DB
  });

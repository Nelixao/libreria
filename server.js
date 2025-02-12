const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./src/config/database'); // Asegúrate de tener la conexión configurada correctamente
const passport = require('./src/config/passport'); // Asegúrate de que passport está correctamente configurado
const bcrypt = require('bcrypt'); // Si usas bcrypt para comparar contraseñas
const { isAdmin } = require('./src/middleware/auth'); // Asegúrate de tener el middleware de autenticación correcto

const app = express();

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'ximenaalonso', // Usar variable de entorno para la clave secreta
    resave: false,
    saveUninitialized: false,
}));

// Inicializar Passport y usar sesiones
app.use(passport.initialize());
app.use(passport.session());

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar datos de formularios

// Servir archivos estáticos correctamente
app.use(express.static(path.join(__dirname, 'public')));

// Cargar las variables de entorno desde .env
require('dotenv').config();

// Rutas API para la gestión de libros y categorías
const categoriasRoutes = require('./src/routes/categorias.routes');
const librosRoutes = require('./src/routes/libros.routes');

// Usar las rutas de categorías y libros
app.use('/api/categorias', categoriasRoutes);
app.use('/api/libros', librosRoutes);

// Rutas de la aplicación (HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Página de categorías
app.get('/categorias', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'categorias.html'));
});

// Página de libros
app.get('/libros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'libros.html'));
});

// Ruta para mostrar el formulario de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

// Ruta para el dashboard (admin/vendedor)
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public', 'html', 'dashboard.html'));
  } else {
    res.redirect('/login');
  }
});

// Ruta para la autenticación de login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirige al panel de administración si la autenticación es exitosa
  failureRedirect: '/login', // Si falla, redirige al login
}));

// Ruta para crear un libro (solo accesible para administradores)
const { Libro } = require('./src/models/Libro.model'); // Asegúrate de que el modelo Libro esté correctamente importado
app.post('/api/libros', isAdmin, async (req, res) => {
    try {
      const { isbn, titulo, autor, editorial, precio, stock } = req.body;
      const libro = await Libro.create({ isbn, titulo, autor, editorial, precio, stock });
      res.status(201).json(libro);  // Responder con el libro creado
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login'); // Redirige al login después de cerrar sesión
  });
});

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    // Sincronización de la base de datos (si es necesario)
    sequelize.sync({ force: false }).then(() => {
      console.log('Base de datos sincronizada');
      // Iniciar servidor
      const PORT = process.env.PORT || 3000; // Usar el puerto de la variable de entorno o 3000 por defecto
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
    }).catch((err) => {
      console.error('Error al sincronizar la base de datos:', err);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

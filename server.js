const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('./src/config/database'); // Conexión a la base de datos
const { DataTypes } = require('sequelize');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Cambia al dominio permitido
app.use(helmet());
const bcrypt = require("bcrypt");
const express = require("express");
const { Usuario } = require("./models"); // Importar el modelo correcto

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Usuario.create({
      nombre,
      email,
      contraseña: hashedPassword, // Aquí guardamos la contraseña encriptada
      rol,
    });

    res.json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario.", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { nombre, password } = req.body;
    const user = await Usuario.findOne({ where: { nombre } });

    if (!user || !(await bcrypt.compare(password, user.contraseña))) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión.", error });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));

// 📌 Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// 📌 Modelos
const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: { // Cambiar password por "contraseña"
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'vendedor', 'cliente'),
        allowNull: false,
        defaultValue: 'cliente'
    }
});


const Libro = sequelize.define('Libro', {
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    categoriaId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
});

const Categoria = sequelize.define('Categoria', {
    nombre: DataTypes.STRING,
});

Categoria.hasMany(Libro, { foreignKey: 'categoriaId' });
Libro.belongsTo(Categoria, { foreignKey: 'categoriaId' });

// 📌 Sincronizar los modelos con la base de datos
sequelize.sync().then(() => console.log('Modelos sincronizados con la base de datos.'));

// 📌 Configuración de la estrategia Local de Passport
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await Usuario.findOne({ where: { nombre } }); // ✅ Correcto

        if (!user) return done(null, false, { message: 'Usuario no encontrado.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta.' });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// 📌 Serializar y deserializar usuarios
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuario.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// 📌 Middleware para proteger rutas
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403).json({ message: 'Acceso denegado. No estás autenticado.' });
}

// 📌 Rutas de Usuario
app.post('/register', async (req, res) => {
    try {
        const { nombre, contraseña, rol } = req.body; // ✅ Correcto


        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({ username, password: hashedPassword, role });
        res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ message: 'Inicio de sesión exitoso', user });
        });
    })(req, res, next);
});

// 📌 Rutas de Libros y Categorías
app.get('/libros', async (req, res) => {
    const libros = await Libro.findAll({ include: Categoria });
    res.json(libros);
});

app.post('/libros', ensureAuthenticated, async (req, res) => {
    const { titulo, autor, categoriaId, stock } = req.body;
    const libro = await Libro.create({ titulo, autor, categoriaId, stock });
    res.json(libro);
});

app.get('/categorias', async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
});

app.post('/categorias', ensureAuthenticated, async (req, res) => {
    const { nombre } = req.body;
    const categoria = await Categoria.create({ nombre });
    res.json(categoria);
});

// 📌 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

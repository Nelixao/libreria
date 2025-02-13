// src/routes/libros.routes.js
const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libros.controller');
const { isAdmin } = require('../middleware/auth'); // Importar middleware

router.post('/libros', isAdmin, librosController.createLibro); // Crear libro (solo admin)
router.get('/libros', librosController.getLibros); // Obtener todos los libros
router.put('/libros/:id', isAdmin, librosController.updateLibro); // Actualizar libro (solo admin)
router.delete('/libros/:id', isAdmin, librosController.deleteLibro); // Eliminar libro (solo admin)

module.exports = router;

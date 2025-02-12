// src/routes/libros.routes.js
const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libros.controller'); // Verifica que este archivo exista

router.post('/libros', librosController.createLibro); // Crear libro (solo admin)
router.get('/libros', librosController.getLibros); // Obtener todos los libros
router.put('/libros/:id', librosController.updateLibro); // Actualizar libro (solo admin)
router.delete('/libros/:id', librosController.deleteLibro); // Eliminar libro (solo admin)

module.exports = router;

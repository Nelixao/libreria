const express = require('express');
const router = express.Router();

// Importar los controladores (suponiendo que tengas estos controladores definidos)
const librosController = require('../controllers/libros.controller');

// Ruta para obtener todos los libros
router.get('/', librosController.getAllLibros);

// Ruta para obtener un libro específico por ID
router.get('/:id', librosController.getLibroById);

// Ruta para agregar un nuevo libro
router.post('/', librosController.createLibro);

// Ruta para actualizar un libro
router.put('/:id', librosController.updateLibro);

// Ruta para eliminar un libro
router.delete('/:id', librosController.deleteLibro);

module.exports = router;

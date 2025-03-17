const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libro.controller');

router.get('/', libroController.obtenerLibros);
router.post('/', libroController.crearLibro);
router.put('/:id', libroController.actualizarLibro);
router.delete('/:id', libroController.eliminarLibro);

module.exports = router;

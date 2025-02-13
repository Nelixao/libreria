// src/controllers/libros.controller.js
const { Libro } = require('../models/Libro.model'); // Asegúrate de que el modelo esté correctamente importado

// Crear un nuevo libro
const createLibro = async (req, res) => {
  try {
    const { isbn, titulo, autor, editorial, precio, stock } = req.body;
    const libro = await Libro.create({ isbn, titulo, autor, editorial, precio, stock });
    res.status(201).json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los libros
const getLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un libro por ID
const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const { isbn, titulo, autor, editorial, precio, stock } = req.body;

    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await libro.update({ isbn, titulo, autor, editorial, precio, stock });
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un libro por ID
const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await libro.destroy();
    res.status(200).json({ message: 'Libro eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLibro,
  getLibros,
  updateLibro,
  deleteLibro
};

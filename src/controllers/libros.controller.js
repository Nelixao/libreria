// src/controllers/libros.controller.js
const Libro = require('../models/Libro.model');

// Crear un nuevo libro
exports.createLibro = async (req, res) => {
  try {
    const { isbn, titulo, autor, editorial, precio, stock } = req.body;
    const libro = await Libro.create({ isbn, titulo, autor, editorial, precio, stock });
    res.status(201).json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los libros
exports.getLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un libro
exports.updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const { isbn, titulo, autor, editorial, precio, stock } = req.body;
    const libro = await Libro.findByPk(id);
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

    libro.isbn = isbn;
    libro.titulo = titulo;
    libro.autor = autor;
    libro.editorial = editorial;
    libro.precio = precio;
    libro.stock = stock;

    await libro.save();
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un libro
exports.deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findByPk(id);
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

    await libro.destroy();
    res.status(204).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

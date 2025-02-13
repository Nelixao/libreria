const Libro = require('../models/Libro.model');

// Controlador para obtener todos los libros
exports.getAllLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll(); // O la consulta que necesites
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los libros', error });
  }
};

// Controlador para obtener un libro por ID
exports.getLibroById = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el libro', error });
  }
};

// Controlador para crear un nuevo libro
exports.createLibro = async (req, res) => {
  try {
    const nuevoLibro = await Libro.create(req.body);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el libro', error });
  }
};

// Controlador para actualizar un libro
exports.updateLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    await libro.update(req.body);
    res.json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el libro', error });
  }
};

// Controlador para eliminar un libro
exports.deleteLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    await libro.destroy();
    res.status(204).json({ mensaje: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el libro', error });
  }
};

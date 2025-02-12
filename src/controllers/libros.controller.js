const { Libro } = require("../models/Libro.model"); // Asegúrate de que la ruta esté correcta


// Obtener todos los libros
const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener libros", error });
  }
};

// Crear un nuevo libro
const crearLibro = async (req, res) => {
  try {
    const { isbn, titulo, autor, editorial, precio, cantidad } = req.body;
    const nuevoLibro = await Libro.create({ isbn, titulo, autor, editorial, precio, cantidad });
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ message: "Error al crear libro", error });
  }
};

// Actualizar un libro
const actualizarLibro = async (req, res) => {
  try {
    const { isbn } = req.params;
    const { titulo, autor, editorial, precio, cantidad } = req.body;
    const libro = await Libro.findByPk(isbn);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;
    libro.editorial = editorial || libro.editorial;
    libro.precio = precio || libro.precio;
    libro.cantidad = cantidad || libro.cantidad;
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar libro", error });
  }
};

// Eliminar un libro
const eliminarLibro = async (req, res) => {
  try {
    const { isbn } = req.params;
    const libro = await Libro.findByPk(isbn);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    await libro.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar libro", error });
  }
};

module.exports = { obtenerLibros, crearLibro, actualizarLibro, eliminarLibro };

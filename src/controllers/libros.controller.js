const Libro = require('../models/libro.model');

exports.obtenerLibros = async (req, res) => {
    const libros = await Libro.findAll();
    res.json(libros);
};

exports.crearLibro = async (req, res) => {
    const { titulo, autor, editorial, isbn, precio, stock } = req.body;
    const libro = await Libro.create({ titulo, autor, editorial, isbn, precio, stock });
    res.status(201).json(libro);
};

exports.actualizarLibro = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, editorial, isbn, precio, stock } = req.body;
    await Libro.update({ titulo, autor, editorial, isbn, precio, stock }, { where: { id } });
    res.json({ mensaje: 'Libro actualizado' });
};

exports.eliminarLibro = async (req, res) => {
    const { id } = req.params;
    await Libro.destroy({ where: { id } });
    res.json({ mensaje: 'Libro eliminado' });
};

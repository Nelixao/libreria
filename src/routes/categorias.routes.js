// routes/categorias.routes.js
const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria.model');

// Definir rutas de categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

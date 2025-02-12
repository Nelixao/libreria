const express = require("express");
const router = express.Router();
const { obtenerLibros, crearLibro, actualizarLibro, eliminarLibro } = require("../controllers/libros.controller");

router.get("/", obtenerLibros);
router.post("/", crearLibro);
router.put("/:isbn", actualizarLibro);
router.delete("/:isbn", eliminarLibro);

module.exports = router;

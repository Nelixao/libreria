const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas de la aplicación
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "login.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "dashboard.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "admin.html")));
app.get("/index", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "index.html")));

// Ruta de login (Verificar rol sin autenticación)
app.post("/login", (req, res) => {
  const { email, password, rol } = req.body;

  // Verificamos el rol que llega desde el formulario
  if (rol === "admin") {
    return res.redirect("/dashboard"); // Redirige al panel de administrador
  } else if (rol === "vendedor") {
    return res.redirect("/index"); // Redirige a la vista de libros
  }

  // Si no coincide, mandamos un error
  res.status(400).send("Rol no reconocido");
});

// Ruta para agregar libros (simulación de base de datos en memoria)
const libros = [];

app.post("/api/libros", (req, res) => {
  const { titulo, autor, categoria, stock } = req.body;

  if (!titulo || !autor || !categoria || stock === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const nuevoLibro = { id: libros.length + 1, titulo, autor, categoria, stock };
  libros.push(nuevoLibro);
  
  res.status(201).json({ mensaje: "Libro agregado exitosamente", libro: nuevoLibro });
});

// Ruta de logout (simple)
app.get("/logout", (req, res) => {
  res.redirect("/login");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

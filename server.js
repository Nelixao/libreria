const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));

// Rutas de la aplicación
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "login.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "dashboard.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "admin.html")));
app.get("/index", (req, res) => res.sendFile(path.join(__dirname, "public", "html", "index.html")));


app.post("/login", (req, res) => {
  const { email, password, rol } = req.body;


  if (rol === "admin") {
    return res.redirect("/dashboard");
  } else if (rol === "vendedor") {
    return res.redirect("/index"); 
  }


  res.status(400).send("Rol no reconocido");
});


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`|| Servidor corriendo en http://localhost:${PORT}`);
});

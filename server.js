const express = require('express');
const app = express();

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor');
});

// Otros controladores que necesites agregar
app.get('/otraRuta', (req, res) => {
  res.send('Otra ruta');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

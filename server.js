const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ximenaalonso',
  database: 'libreria'
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Define una ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

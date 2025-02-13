const { Sequelize } = require('sequelize');

// Cargar las variables de entorno desde un archivo .env si estás usando dotenv
require('dotenv').config();

// Configuración de Sequelize para conectar con la base de datos
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || "ximenaalonso",  // Cambié 'contraseña' a 'password'
  database: process.env.DB_NAME || "libreria",
});

// Intentar conectar a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Exportar la instancia de Sequelize para ser utilizada en otros archivos
module.exports = sequelize;

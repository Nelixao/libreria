const { Sequelize } = require('sequelize'); // Asegúrate de que esta línea esté al inicio del archivo

const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || "ximenaalonso",
  database: process.env.DB_NAME || "libreria",
});
module.exports = sequelize;
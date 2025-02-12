const { Sequelize, DataTypes } = require('sequelize');

// Asegúrate de que 'sequelize' esté correctamente instanciado
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || "ximenaalonso",
  database: process.env.DB_NAME || "libreria",
});

const Usuario = sequelize.define('Usuario', {
  // Definición de los atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Agrega otros atributos de tu modelo aquí
});

module.exports = Usuario;

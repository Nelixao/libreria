const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que la conexión a la base de datos sea correcta

const Libro = sequelize.define('Libro', {
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  editorial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Libro;

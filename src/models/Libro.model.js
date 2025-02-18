const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta si es necesario

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  calificacion: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
});

// Sincronizar el modelo con la base de datos
Libro.sync({ alter: true }).then(() => {
  console.log('Tabla de libros sincronizada con la base de datos');
});

module.exports = Libro;

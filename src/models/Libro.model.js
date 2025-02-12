// src/models/libro.model.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // O la configuración de tu base de datos

const Libro = sequelize.define("Libro", {
  isbn: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING
  },
  autor: {
    type: DataTypes.STRING
  },
  editorial: {
    type: DataTypes.STRING
  },
  precio: {
    type: DataTypes.FLOAT
  },
  cantidad: {
    type: DataTypes.INTEGER
  }
});

module.exports = Libro;

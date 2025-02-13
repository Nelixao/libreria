const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://user:contraseña@localhost:3306/database');


const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Categoria;

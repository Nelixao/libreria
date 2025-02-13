const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que la ruta del archivo de configuración de la base de datos sea correcta

class Usuario extends Model {}

Usuario.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {  // Se mantiene como 'contraseña'
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'Usuarios',  // Puedes personalizar el nombre de la tabla si es necesario
});

module.exports = Usuario;  // Exporta el modelo para poder usarlo en otras partes del proyecto

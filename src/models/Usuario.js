const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');  // Asegúrate de tener la configuración de tu base de datos.

class Usuario extends Model {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async validatePassword(inputPassword, storedPassword) {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}

Usuario.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Usuario',  // Asegúrate de que el nombre del modelo esté en singular (Usuario).
});

module.exports = Usuario;

const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "mysql", // o 'postgres', dependiendo de tu DB
  host: "localhost",
  username: "root",
  password: "ximenaalonso",
  database: "libreria",
});

module.exports = db;

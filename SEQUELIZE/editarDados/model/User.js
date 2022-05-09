const { DataTypes } = require("sequelize");
const db = require("../db/conn");




//Guarda dads do Usuário
const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    require: true,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = User

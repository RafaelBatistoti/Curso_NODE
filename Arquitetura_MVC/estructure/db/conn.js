const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemvc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connected!!");
} catch (error) {
  console.log(`Ocorreu um erro: ${error}`);
}

module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pensamentos", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connected!!");
} catch (error) {
  console.log(`erro: ${error}`);
}

module.exports = sequelize
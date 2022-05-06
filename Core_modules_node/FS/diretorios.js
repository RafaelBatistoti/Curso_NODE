const fs = require("fs");

if (!fs.existsSync("/newFolder")) {
  console.log("não existe");
  fs.mkdtempSync("newFolder");
}

console.log("Já existe");

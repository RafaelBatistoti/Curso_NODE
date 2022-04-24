const dotenv = require('dotenv').config()
const config = require("config")
const express = require("express")();
const app = express;

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

console.log('Aplication name: ' + config.get('name')); // set NODE_ENV=development
console.log('Mail-host: ' + config.get('mail.host')); // set NODE_ENV=development
// console.log('Mail-host: ' + config.get('mail.password')); // set NODE_ENV=development
 


app.get("/", (req, res) => {
  res.send("Testando variaveis de ambiente");
});

app.listen(3000, () => {
    console.log("running!!");
  });
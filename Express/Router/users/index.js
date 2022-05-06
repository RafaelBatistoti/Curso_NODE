const express = require("express");
const route = express.Router();
const path = require("path");
const parseUrl = require("body-parser");

//Lendo o Body
let encodeUrl = parseUrl.urlencoded({ extended: false });

//Path da pasta de HTML
const localPath = path.join(__dirname, "../Templates");

//POST
route.get("/add", (req, res) => {
  res.sendFile(`${localPath}/usersForm.html`);
});

route.post("/save", encodeUrl, (req, res) => {
  console.log("Form request:", req.body);

  const name = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(`Nome: ${name} \n Lastname: ${lastName} \n Email: ${email}`);

  res.sendStatus(200);
});

route.get("/express", (req, res) => {
  res.sendFile(`${localPath}/express.html`);
});

module.exports = route;

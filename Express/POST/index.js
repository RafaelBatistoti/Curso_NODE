const express = require("express");
const path = require("path");
const parseUrl = require("body-parser");

const port = 3000;
const app = express();

//Lendo o Body
let encodeUrl = parseUrl.urlencoded({ extended: false });

//Path da pasta de HTML
const localPath = path.join(__dirname, "Templates");

//POST
app.get("/users/add", (req, res) => {
  res.sendFile(`${localPath}/usersForm.html`);
});

app.post("/users/save", encodeUrl, (req, res) => {
  console.log("Form request:", req.body);

  const name = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(`Nome: ${name} \n Lastname: ${lastName} \n Email: ${email}`);

  res.sendStatus(200);
});

app.listen(port, console.log(`Running at port ${port}`));

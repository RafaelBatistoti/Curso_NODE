const express = require("express");
const path = require("path");

const port = 3000;
const app = express();
const localPath = path.join(__dirname, "Templates");

//Rota que acessa o HTML
app.get("/template", (req, res) => {
  res.sendFile(`${localPath}/teste.html`);
});

//primeiro get
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

//Params
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Estamos buscando por usuários:${id}`);
  res.sendFile(`${localPath}/users.html`);
});

app.listen(port, console.log(`Running at port ${port}`));

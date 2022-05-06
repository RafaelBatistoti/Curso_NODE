const express = require("express");
const path = require("path");

const port = 3000;
const app = express();
const localPath = path.join(__dirname, "Templates");

//Midlewere
const checkAuth = (req, res, next) => {
  req.authStatus = true;
  if (req.authStatus) {
    console.log("Está logado");
    next()
  } else {
    console.log("Não está logado");
    next()
  }
};

app.use(checkAuth);

//primeiro get
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

//Rota que acessa o HTML
app.get("/template", (req, res) => {
  res.sendFile(`${localPath}/teste.html`);
});

app.listen(port, console.log(`Running at port ${port}`));

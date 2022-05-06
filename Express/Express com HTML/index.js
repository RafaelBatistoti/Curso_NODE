const express = require("express");
const path = require("path");

const port = 3000;
const app = express();
const localPath = path.join(__dirname, 'Templates')

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/template", (req, res) => {
    res.sendFile(`${localPath}/teste.html`);
  });

app.listen(port, console.log(`Running at port ${port}`));

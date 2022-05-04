const express = require("express");
const pug = require("pug");
const app = express;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("template", {
    title: "My app",
    message: "teste",
  });
});

app.listen(3000, () => {
  console.log("Running");
});

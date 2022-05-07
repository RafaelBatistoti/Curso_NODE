const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "Rafael",
    lastname: "Batistoti",
  };

  const auth = true;
  const approved = false;

  res.render("home", { user: user, auth, approved });
});

app.get("/dashboard", (req, res) => {

const items= ['a', 'b','c','d','e']

  res.render("dashboard", {items });
});

app.listen(3000, () => console.log("Running"));

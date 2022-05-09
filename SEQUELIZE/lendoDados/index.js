const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require("./model/User");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Move to Register Page
app.get("/user/create", (req, res) => {
  res.render("adduser");
});

app.post("/user/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  console.log(req.body);

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter === false;
  }

  await User.create({ name, occupation, newsletter });

  res.redirect("/");
});

app.get("/",  async(req, res) => {

  const users   = await User.findAll({raw: true})

  res.render("home", {'users': users});
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

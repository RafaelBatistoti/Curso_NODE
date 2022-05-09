const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require("./model/User");
const Adress = require("./model/Adress");

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

//Cria usuários
app.post("/user/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter === false;
  }

  await User.create({ name, occupation, newsletter });

  res.redirect("/");
});

//Lista usuários e occupações especificas
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const users = await User.findOne({ raw: true, where: { id: id } });

  res.render("userview", { users });
});

//remove user
app.post("/user/remove/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

//Edit users e resgate de dados Relacionados
app.get("/user/editar/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ include: Adress, where: { id: id } });
    res.render("useredit", { user: user.get({ plain: true }) });
  } catch (error) {
    console.log(error);
  }
});

//Update dados
app.post("/user/update", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  const newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter === false;
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  await User.update(userData, { where: { id: id } });

  res.redirect("/");
});

//cria o endereço
app.post("/adress/create", async (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const adress = {
    UserId,
    street,
    number,
    city,
  };

  await Adress.create(adress);
  res.redirect(`/user/editar/${UserId}`);
});

//Lista usuários cadastrados
app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render("home", { users: users });
});

conn
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

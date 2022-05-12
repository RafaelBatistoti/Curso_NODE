const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

//chama a conecção com o bd
const conn = require("./db/conn");

//chama os methodos do Controllers
const Task = require("./model/Task");

//Chama as rotas criadas
const tasksRoutes = require("./routes/tasksRoutes");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use("/tasks", tasksRoutes);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

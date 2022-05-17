const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");

//Import Controllers
const ToughtController = require("./controllers/ToughtController");

//Call routes
const toughtRouter = require("./routes/toughtRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Call bd connection
const conn = require("./db/conn");

//Template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Receber resposta do body
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Sessiom middlewere
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: "false",
    store: new FileStore({
      logFn: () => {},
      path: require("path").join(require("os").tmpdir(), "session"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//Chamar Models
const Tought = require("./model/Tought");
const User = require("./model/User");

//Flash msg do system
app.use(flash());

//Arquivos Publicos
app.use(express.static("public"));

//Set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});
app.use("/tought", toughtRouter);
app.use("/", authRoutes);

//Routes
app.get("/", ToughtController.showToughts);

conn
  // .sync({force:true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(`Error ${err}`));

const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

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

app.get("/", (req, res) => {
  res.render("home");
});

//insert Data in SQL
app.post("/book/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqnty = req.body.pageqnty;

  const sql = `INSERT INTO books (title, pageqnty) VALUES('${title}','${pageqnty}' )`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/books");
  });
});
//Resgata oque foi cadastrado
app.get("/books", (req, res) => {
  const sqlQuery = "SELECT * FROM books";

  conn.query(sqlQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const books = data;
    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sqlQuery, (err, data) => {
    if (err) {
      console.log(err);
    }

    const book = data[0];

    res.render("book", { book });
  });
});

//Connect with the BD
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected!!");

  app.listen(3000);
});

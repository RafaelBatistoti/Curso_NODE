const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const pool = require("./db/conn");

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

  pool.query(sql, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/books");
  });
});
//Resgata oque foi cadastrado
app.get("/books", (req, res) => {
  const sqlQuery = "SELECT * FROM books";

  pool.query(sqlQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const books = data;
    res.render("books", { books });
  });
});

//Filter by ID
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM books WHERE id = ${id}`;

  pool.query(sqlQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render("book", { book });
  });
});

//Filter by ID e and move to Edit page
app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM books WHERE id = ${id}`;

  pool.query(sqlQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];
    res.render("editbook", { book });
  });
});

//Edit the name of book
app.post("/books/updatedbook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqnty = req.body.pageqnty;

  const sqlQuery = `UPDATE books SET title = '${title}', pageqnty = '${pageqnty}' WHERE id = ${id}`;

  pool.query(sqlQuery, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/books");
  });
});

app.post("/books/remove/:id", (req, res) => {
  const id = req.params.id;

  const sqlQuery = `DELETE FROM books WHERE id = ${id}`;

  pool.query(sqlQuery, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/books");
  });
});

app.listen(3000);

// //poolect with the BD
// const pool = mysql.createpoolection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "nodemysql",
// });

// pool.poolect((err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("poolected!!");

// });

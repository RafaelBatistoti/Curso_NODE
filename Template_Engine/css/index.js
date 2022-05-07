const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/patials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static('public'))

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Blog",
      category: "php",
      body: "Linguagem de programação",
      comments: 4,
    },
    {
      title: "Blog",
      category: "node",
      body: "Linguagem de programação",
      comments: 3,
    },
    {
      title: "Blog",
      category: "html",
      body: "Linguagem de programação",
      comments: 2,
    },
  ];

  res.render("blog", { posts });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Blog",
    category: "Java",
    body: "Linguagem de programação",
    comments: 4,
  };

  res.render("blogPost", { post });
});

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
  const items = ["a", "b", "c", "d", "e"];

  res.render("dashboard", { items });
});

app.listen(3000, () => console.log("Running"));

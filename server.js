
const Joi = require("joi");
const express = require("express")();
const app = express;
const bodyParser = require("body-parser");
const cursoRotas = require('./rotas_curso/rotas')

app.use(bodyParser.json());

app.use('/api', cursoRotas)

app.get("/", (req, res) => {
  res.send("Running");
});


app.listen(3000, () => {
  console.log("running!!");
});



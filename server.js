
const Joi = require("joi");
const express = require("express")();
const app = express;
const bodyParser = require("body-parser");
const cursoRotas = require('./rotas_curso/rotas')
const mercadoRotas = require('./praticando_rotas/market')

app.use(bodyParser.json());

app.use('/api', cursoRotas)
app.use('/estoque', mercadoRotas)


app.get("/", (req, res) => {
  res.send("Running Server");
});


app.listen(3000, () => {
  console.log("running!!");
});



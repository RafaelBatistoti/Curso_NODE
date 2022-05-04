const Joi = require("joi");
const express = require("express");
const { send } = require("express/lib/response");
const routeMarket = express.Router();

const estoqueGeral = [
  { id: 1, item: "banana", quantidade: 5 },
  { id: 2, item: "maça", quantidade: 15 },
  { id: 3, item: "pera", quantidade: 8 },
  { id: 4, item: "melacia", quantidade: 3 },
];

routeMarket.get("/", (req, res) => {
  res.send(estoqueGeral);
});

routeMarket.post("/addItem", (req, res) => {
  const schema = Joi.object({
    item: Joi.string().min(3).required(),
    quantidade: Joi.number().precision(3).required(),
  });
  const resultado = schema.validate(req.body);
  if (resultado.error) {
    res.status(400).send(resultado.error.details[0].message);
    return;
  }

  const novoItem = {
    id: estoqueGeral.length + 1,
    item: req.body.item,
    quantidade: req.body.quantidade,
  };
  estoqueGeral.push(novoItem);
  res.send(novoItem);
});

routeMarket.put("/addItem/:id", (req, res) => {
  const updateItem = estoqueGeral.find((c) => c.id === parseInt(req.params.id));
  if (!updateItem) {
    return res.status(404).send("Item não encontrado");
  }
});

routeMarket.delete("/addItem/:id", (req, res) => {
  const deleteItem = estoqueGeral.find((c) => c.id === parseInt(req.params.id));
  if (!deleteItem) {
    return res.send(404).send("Item não encontrado");
  }

  const index = estoqueGeral.indexOf(deleteItem);
  estoqueGeral.splice(index, 1);
  res.send(deleteItem);
});

module.exports = routeMarket;

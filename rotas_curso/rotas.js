const Joi = require("joi");
const express = require("express");
const router = express.Router();

const tabelaCursos = [
  { id: 1, name: "java" },
  { id: 2, name: "javascript" },
  { id: 3, name: "react" },
];

router.get("/cursos/:id", (req, res) => {
  const validaIDCurso = tabelaCursos.find(
    (c) => c.id === parseInt(req.params.id)
  );
  if (!validaIDCurso) {
    return res.status(404).send("Curso não encontrado");
  }
});

router.get("/cursos", (req, res) => {
  res.send(tabelaCursos);
});

router.post("/cursos", (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const novaDisciplina = {
    id: tabelaCursos.length + 1,
    name: req.body.name,
  };
  tabelaCursos.push(novaDisciplina);
  res.json(novaDisciplina);
});

router.put("/cursos/:id", (req, res) => {
  const updateCurso = tabelaCursos.find((c) => c.id === parseInt(req.params.id));
  if (!updateCurso) {
    return res.status(404).send("curso não encontrado");
  }
  const { error } = validation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  updateCurso.name = req.body.name;
  res.send(updateCurso);
});

router.delete("/cursos/:id", (req, res) => {
  const deletaCurso = tabelaCursos.find(
    (c) => c.id === parseInt(req.params.id)
  );
  if (!deletaCurso) {
    return res.status(404).send("Curso não encontrado");
  }
  const index = tabelaCursos.indexOf(deletaCurso);
  tabelaCursos.splice(index, 1); 

  res.send(deletaCurso);
});

function validation(validaIDCurso) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(validaIDCurso);
}

module.exports = router;

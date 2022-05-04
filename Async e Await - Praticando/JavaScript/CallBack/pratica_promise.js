console.log("Começo");

// mercado(1, (listaItem) => {
//   console.log("Itens:", listaItem);

//   cursos(listaItem[0], (listaCursos) => {
//     console.log("Cursos", listaCursos);
//     profissoes(listaCursos[0], (listaTrabalho) => {
//       console.log("profissoes:", listaTrabalho);
//     });
//   });
// });

mercado(1)
  .then((listaItem) => cursos(listaItem[0]))
  .then((listaCursos) => profissoes(listaCursos[0]))
  .then((listaTrabalho) => console.log(listaTrabalho))
  .catch((err) => console.log("Erro: ", err.message));

console.log("Fim");

function mercado(idItem) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("listando itens");
      res(["morango", "pessego", "uva", "abacaxi"]);
    }, 2000);
  });
}

function cursos(idCurso) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("carregando lista de cursos...");
      res(["java", "json", "javascript", "node"]);
    }, 2000);
  });
}

function profissoes(idCommit) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Carregando lista de profissoes");
      res(["pedreiro", "engenheiro", "contador"]);
    }, 2000);
  });
}

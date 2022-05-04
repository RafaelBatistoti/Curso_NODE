const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    console.log("chama promise 1");
    res(1)
    // rej(new Error("Algo de errado não está certo")); //caso de erro
  }, 200);
});
const p2 = new Promise((res) => {
  setTimeout(() => {
    console.log("chama promise 2");
    res(2);
  }, 200);
});

Promise.race([p1, p2])
  .then((resultado) => console.log("resultado", resultado))
//   .catch((erro) => console.log(erro.message));

console.log("Começo");

// getUser(1, (user) => {
//   console.log("User", user);
//   reposirories(user.nome, (repos) => {
//     console.log("repos", repos);
//     getCommits(repos[0], (commits) => {
//       console.log("API", commits);
//     });
//   });
// });

// getUser(12)
//   .then((usuario) => reposirories(usuario.nome))
//   .then((repoName) => getCommits(repoName[0]))
//   .then((comits) => console.log("Commits:", comits));

async function displayCommit() {
  try {
    const user = await getUser(10);
    const repo = await reposirories(user.nome);
    const commit = await getCommits(repo[0]);
    console.log("Commit: ", commit);
  } catch (error) {
    console.log('Erro', error);
  }
}

displayCommit();

console.log("Fim");

function getUser(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Loading...");
      res({ id: id, nome: "Rafael Batistoti" });
    }, 3000);
  });
}

function reposirories(repoName) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Loading repositories...");
      res(["repo1", "repo2", "repo3"]);
      // rej(new Error('Não foi possivel ver lista de repositório: '))
    }, 3000);
  });
}

function getCommits(repo) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Call API");
      res(["commit"]);
    }, 3000);
  });
}

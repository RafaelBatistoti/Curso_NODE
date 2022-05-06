const fs = require("fs");

fs.unlink("arquivo.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Arquivo removido");
  }
});

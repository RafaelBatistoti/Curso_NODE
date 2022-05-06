const fs = require("fs");

fs.rename("arquivo.txt", 'archive.txt',(err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Arquivo renomeado");
  }
});

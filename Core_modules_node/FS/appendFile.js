const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.username;

  if (!name) {
    fs.readFile("teste.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    const newLine = name + '\n'
    fs.appendFile("arquivo.txt", newLine, (err, data) => {
      res.writeHead(302, {
        location: "/",
      });
      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log("Running!!");
});

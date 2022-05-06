const express = require("express");
const path = require("path");
const users = require("./users");

const port = 3000;
const app = express();

//Path da pasta de HTML
const localPath = path.join(__dirname, "Templates");

//Call route Users
app.use("/users", users);

//Call CSS stacs files
app.use(express.static(path.join(__dirname,"public")));

//Call 404 
app.use((req,res,next)=>{
  res.sendFile(`${localPath}/404.html`);
})

app.listen(port, console.log(`Running at port ${port}`));

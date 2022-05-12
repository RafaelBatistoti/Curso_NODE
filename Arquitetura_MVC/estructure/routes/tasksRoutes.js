const express = require("express");
const route = express.Router();

//Chama o Controller
const TaskController = require("../controllers/TaskController");

//Cria as rotas (CRUD)
route.get("/add", TaskController.createTask);

// Criação de um methodo POST pra salvar no BD
route.post("/add", TaskController.createTaskSave);

//Rota para remover dados
route.post("/remove", TaskController.removeTask);

// Edita no BD
route.post("/edit", TaskController.updateTaskPost);

route.post("/updateStatus", TaskController.toggleTasksStatus);

//Rota para alterar dados
route.get("/edit/:id", TaskController.updateTask);

route.get("/", TaskController.showTasks);

module.exports = route;

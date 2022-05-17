const express = require("express");
const route = express.Router();
const ToughtController = require("../controllers/ToughtController");
const checkAuth = require("../helpers/auth").checkAuth;

//Call Controller
route.get("/add", checkAuth, ToughtController.createTought);
route.post("/add", checkAuth, ToughtController.createToughtPost);
route.get("/edit/:id", checkAuth, ToughtController.editTought);
route.post("/edit", checkAuth, ToughtController.editToughtSave);
route.get("/dashboard", checkAuth, ToughtController.dashboard);
route.post("/remove", ToughtController.removeToughts);
route.get("/", ToughtController.showToughts);


module.exports = route;

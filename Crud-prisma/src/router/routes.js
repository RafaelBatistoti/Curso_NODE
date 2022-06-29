import { Router } from "express";
import UserController from "../controllers/UserController";

const router = new Router();

router.post("/user", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/user/:id", UserController.findUser);
router.put("/user/:id", UserController.editUser);
router.delete("/user/:id", UserController.deleteUser);


export { router };

import express from "express";
import {router} from "../src/router/routes"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router)

app.listen(3000, () => console.log("Connected!!"));

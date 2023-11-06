import express from "express";
import { sumProducts } from "../controller/adminCtrl.js";
const routes = express.Router();
routes.route("/").get(sumProducts);
export default routes;

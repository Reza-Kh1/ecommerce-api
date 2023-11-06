import express from "express";
const routes = express.Router();
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
} from "../controller/orderCtrl.js";
import getToken from "../utils/getToken.js";
routes.route("/").post(getToken, createOrder).get(getToken, getAllOrder);
routes
  .route("/:id")
  .get(getToken, getSingleOrder)
  .delete(getToken, deleteOrder)
  .put(getToken, updateOrder);
export default routes;

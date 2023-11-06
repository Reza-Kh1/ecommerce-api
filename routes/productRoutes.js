import express from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  getProductCtrl,
  getSinglePageCtrl,
  updateProductCtrl,
} from "../controller/productCtrl.js";
import getToken from "../utils/getToken.js";
import upload from "../config/uploadFile.js";
const routes = express.Router();
// ,upload.array("files")
routes.post("/create", getToken,createProductCtrl);
routes.get("/", getProductCtrl);
routes
  .route("/:id")
  .get(getSinglePageCtrl)
  .delete(getToken, deleteProductCtrl)
  .put(getToken, updateProductCtrl);

export default routes;

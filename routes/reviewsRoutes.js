import express from "express";
import {
  createReviews,
  deleteReviwes,
  getAllReviews,
  getSingleReviews,
  updateReviews,
} from "../controller/reviewsCtrl.js";
import getToken from "../utils/getToken.js";
const routes = express.Router();

routes.route("/").get(getAllReviews).post(getToken, createReviews);
routes
  .route("/:id")
  .get(getSingleReviews)
  .delete(getToken, deleteReviwes)
  .put(getToken, updateReviews);
export default routes;

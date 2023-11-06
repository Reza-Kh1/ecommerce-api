import express from "express";
import {
  DeleteCoupon,
  createCoupon,
  getAllCoupon,
  getSingleCoupon,
  useCoupon,
  updateCuoupon,
} from "../controller/couponCtrl.js";
import getToken from "../utils/getToken.js";
const routes = express.Router();

routes.route("/").get(getToken, getAllCoupon).post(getToken, createCoupon);
routes
  .route("/:id")
  .delete(DeleteCoupon)
  .put(updateCuoupon)
  .get(getSingleCoupon)
  .post(useCoupon);
export default routes;

import express from "express";
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getCategoryCtrl,
  updateCategoryCtrl,
} from "../controller/categoryCtrl.js";
import getToken from "../utils/getToken.js";
const router = express.Router();

router
  .route("/")
  .post(getToken, createCategoryCtrl)
  .get(getCategoryCtrl)
  .put(getToken, updateCategoryCtrl);
router.delete("/:id", (getToken, deleteCategoryCtrl));
export default router;

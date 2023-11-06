import { userLoginCtrl, userRegisterCtrl } from "../controller/userCtrl.js";
import express from "express";
import getToken from "../utils/getToken.js";

const route = express.Router();

route.post("/register", userRegisterCtrl);
route.post("/login",userLoginCtrl)
export default route;

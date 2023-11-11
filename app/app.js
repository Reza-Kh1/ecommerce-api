import express from "express";
import dbConnect from "../config/dbConnect.js";
import dotenv from "dotenv";
import cors from "cors"
import routeUser from "../routes/userRoutes.js";
import routeProduct from "../routes/productRoutes.js";
import routeCategory from "../routes/categoryRoutes.js";
import routeReviews from "../routes/reviewsRoutes.js";
import routeOrder from "../routes/orderRoutes.js";
import routeCoupon from "../routes/couponRoutes.js";
import routesAdmin from "../routes/adminRoutes.js";
import { gloablHandler, notFound } from "../middlewares/globalErrorHandler.js";

// data handler
dotenv.config();
dbConnect();
const app = express();
app.use(cors())
app.use(express.json());

// route handler
app.use("/user", routeUser);
app.use("/product", routeProduct);
app.use("/category", routeCategory);
app.use("/reviews", routeReviews);
app.use("/order", routeOrder);
app.use("/coupon", routeCoupon);
app.use("/admin", routesAdmin);
// error handler
app.use(notFound);
app.use(gloablHandler);
export default app;

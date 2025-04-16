import express from "express";
import productRoutes from "./product.route.js";

const routes = express();

routes.use("/products", productRoutes);

export default routes;

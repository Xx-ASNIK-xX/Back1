import express from "express";
import { getHomeView, getRealTimeProductsView } from "../controllers/views.controller.js";

const router = express.Router();

// Ruta para la vista principal
router.get("/", getHomeView);

// Ruta para la vista en tiempo real
router.get("/realtimeproducts", getRealTimeProductsView);

export default router;
import express from "express";
import productManager from "../managers/ProductManager.js";

const router = express.Router();

// Ruta para la vista principal
router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { title: "Home", products });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Ruta para la vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("realTimeProducts", { title: "Productos en Tiempo Real", products });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

export default router;
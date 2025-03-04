import { Router } from "express";
import { getCarts, getCartById, createCart, addProductToCart } from "../controllers/carts.controller.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/product/:pid", addProductToCart);

export default router;
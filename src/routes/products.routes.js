import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = Router();

router.get("/", getAllProducts); // Cambiado de getProducts a getAllProducts
router.get("/:pid", getProductById);
router.post("/", createProduct); // Cambiado de addProduct a createProduct
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;
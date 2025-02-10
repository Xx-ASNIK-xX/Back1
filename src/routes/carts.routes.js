// Importamos Router de Express para manejar las rutas e importamos la instancia de CartManager para manejar la lógica
import { Router } from "express";
import cartManager from "../managers/CartManager.js";

// Creamos un enrutador de Express
const router = Router();

//  Define una ruta GET  Obtiene todos los carritos
router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json(carts);
});

// Define una ruta POST Crea un nuevo carrito vacío
router.post("/", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);// Devuelve el carrito recién creado con código de estado 201 (creado)
});

// Define una ruta GET Obtiene los productos de un carrito específico
router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(Number(req.params.cid));
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });// Si el carrito no se encuentra, devuelve un error 404
    }
});

// Define una ruta POST Agrega un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const cart = await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
    if (cart?.error) {
        return res.status(404).json(cart); // Devuelve el mensaje de error con código 404
    }
    res.json(cart); // Si no hay errores, devuelve el carrito actualizado
});

export default router;

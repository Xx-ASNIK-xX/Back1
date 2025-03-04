import cartManager from "../managers/CartManager.js";

export const getCarts = async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los carritos" });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cart = await cartManager.getCartById(Number(req.params.cid));
        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
};

export const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const cart = await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));

        if (cart?.error) {
            return res.status(404).json(cart);
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
};
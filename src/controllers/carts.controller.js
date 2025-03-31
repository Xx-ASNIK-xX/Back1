import CartModel from '../models/cart.model.js';
import mongoose from 'mongoose';

// Validar ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getCarts = async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los carritos" });
    }
};

// Obtener un carrito por ID con productos populados
export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        
        if (!isValidObjectId(cid)) {
            return res.status(400).json({ 
                status: 'error', 
                error: `ID de carrito inválido: ${cid}` 
            });
        }

        const cart = await CartModel.findById(cid)
            .populate('products.product')
            .lean();
        
        if (!cart) {
            return res.status(404).json({ 
                status: 'error', 
                error: `Carrito con ID ${cid} no encontrado` 
            });
        }
        
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en getCartById:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// Crear un nuevo carrito
export const createCart = async (req, res) => {
    try {
        const newCart = await CartModel.create({ products: [] });
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        console.error('Error en createCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'IDs de carrito y/o producto inválidos' 
            });
        }
        {
            "status": "success",
            "payload": {
                "_id": "67eaccf01cdac29bb5396e39",
                "products": [
                    {
                        "product": {
                            "_id": "67eab3e6f6886c740749410d",
                            "title": "Yamaha Fz",
                            "description": "Fi 3.0 / 149 cc ",
                            "code": "ABC123",
                            "price": 5720000,
                            "status": true,
                            "stock": 10,
                            "category": "motos",
                            "thumbnails": [
                                "img1.jpg",
                                "img2.jpg"
                            ],
                            "createdAt": "2025-03-31T15:25:26.190Z",
                            "updatedAt": "2025-03-31T15:25:26.190Z"
                        },
                        "quantity": 3,
                        "_id": "67eacf461cdac29bb5396e43"
                    },
                    {
                        "product": {
                            "_id": "67eab3e6f6886c740749410e",
                            "title": "Bajaj Dominar 400",
                            "description": "Tourer / 373 cc ",
                            "code": "ABC234",
                            "price": 7972500,
                            "status": true,
                            "stock": 5,
                            "category": "motos",
                            "thumbnails": [
                                "img1.jpg",
                                "img2.jpg"
                            ],
                            "createdAt": "2025-03-31T15:25:26.191Z",
                            "updatedAt": "2025-03-31T15:25:26.191Z"
                        },
                        "quantity": 1,
                        "_id": "67eb02381cdac29bb5396e4c"
                    }
                ],
                "createdAt": "2025-03-31T17:12:16.130Z",
                "updatedAt": "2025-03-31T20:59:36.617Z",
                "__v": 2
            }
        }
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ 
                status: 'error', 
                error: `Carrito con ID ${cid} no encontrado` 
            });
        }

        const productIndex = cart.products.findIndex(
            item => item.product.toString() === pid
        );

        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en addProductToCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// DELETE api/carts/:cid/products/:pid - Eliminar un producto específico del carrito
export const removeProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'IDs de carrito y/o producto inválidos' 
            });
        }

        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ 
                status: 'error', 
                error: `Carrito con ID ${cid} no encontrado` 
            });
        }

        const initialLength = cart.products.length;
        cart.products = cart.products.filter(
            item => item.product.toString() !== pid
        );

        if (cart.products.length === initialLength) {
            return res.status(404).json({ 
                status: 'error', 
                error: 'Producto no encontrado en el carrito' 
            });
        }

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en removeProductFromCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// PUT api/carts/:cid - Actualizar todo el carrito
export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        if (!isValidObjectId(cid)) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'ID de carrito inválido' 
            });
        }

        if (!Array.isArray(products)) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'El campo products debe ser un array' 
            });
        }

        // Validar el formato de cada producto
        for (const item of products) {
            if (!item.product || !item.quantity || !isValidObjectId(item.product)) {
                return res.status(400).json({ 
                    status: 'error', 
                    error: 'Formato de producto inválido. Debe incluir product (ObjectId) y quantity (Number)' 
                });
            }
        }

        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ 
                status: 'error', 
                error: `Carrito con ID ${cid} no encontrado` 
            });
        }

        cart.products = products;
        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en updateCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// PUT api/carts/:cid/products/:pid - Actualizar cantidad de un producto
export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'IDs de carrito y/o producto inválidos' 
            });
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'La cantidad debe ser un número entero positivo' 
            });
        }

        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ 
                status: 'error', 
                error: `Carrito con ID ${cid} no encontrado` 
            });
        }

        const productIndex = cart.products.findIndex(
            item => item.product.toString() === pid
        );

        if (productIndex === -1) {
            return res.status(404).json({ 
                status: 'error', 
                error: 'Producto no encontrado en el carrito' 
            });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en updateProductQuantity:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// DELETE api/carts/:cid - Eliminar todos los productos del carrito
export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params;

        if (!isValidObjectId(cid)) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'ID de carrito inválido' 
            });
        }

        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ 
                status: 'error', 
                error: `Carrito con ID ${cid} no encontrado` 
            });
        }

        cart.products = [];
        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en clearCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};
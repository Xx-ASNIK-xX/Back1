import CartModel from '../models/cart.model.js';
import mongoose from 'mongoose';

// Validar ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getCarts = async (req, res) => {
    try {
        const carts = await CartModel.find().lean();
        res.json({ status: 'success', payload: carts });
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

// Eliminar producto del carrito
export const removeProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(item => item.product.toString() !== pid);
        await cart.save();

        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en removeProductFromCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// Actualizar carrito
export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        const cart = await CartModel.findByIdAndUpdate(
            cid,
            { products },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en updateCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// Actualizar cantidad de producto
export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === pid);
        if (productIndex === -1) {
            return res.status(404).json({ status: 'error', error: 'Producto no encontrado en el carrito' });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en updateProductQuantity:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await CartModel.findByIdAndUpdate(
            cid,
            { products: [] },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en clearCart:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};
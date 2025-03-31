import { Router } from 'express';
import {
    getCartById,
    createCart,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantity,
    clearCart
} from '../controllers/carts.controller.js';

const router = Router();

// GET api/carts/:cid - Obtener un carrito por ID
router.get('/:cid', getCartById);

// POST api/carts - Crear un nuevo carrito
router.post('/', createCart);

// POST api/carts/:cid/products/:pid - Agregar producto al carrito
router.post('/:cid/products/:pid', addProductToCart);

// DELETE api/carts/:cid/products/:pid - Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', removeProductFromCart);

// PUT api/carts/:cid - Actualizar todo el carrito
router.put('/:cid', updateCart);

// PUT api/carts/:cid/products/:pid - Actualizar cantidad de un producto
router.put('/:cid/products/:pid', updateProductQuantity);

// DELETE api/carts/:cid - Eliminar todos los productos del carrito
router.delete('/:cid', clearCart);

export default router; 
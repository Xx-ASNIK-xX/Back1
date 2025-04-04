import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';

class CartManager {
    async getCarts() {
        try {
            return await CartModel.find().populate('products.product').lean();
        } catch (error) {
            throw new Error(`Error al obtener carritos: ${error.message}`);
        }
    }

    async getCartById(id) {
        try {
            const cart = await CartModel.findById(id).populate('products.product').lean();
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw new Error(`Error al obtener carrito: ${error.message}`);
        }
    }

    async createCart() {
        try {
            const newCart = await CartModel.create({ products: [] });
            return newCart.toObject();
        } catch (error) {
            throw new Error(`Error al crear carrito: ${error.message}`);
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            // Verificar que el producto existe
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            // Verificar stock
            if (product.stock < quantity) {
                throw new Error('Stock insuficiente');
            }

            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            // Buscar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(
                item => item.product.toString() === productId
            );

            if (productIndex !== -1) {
                // Si el producto ya existe, actualizar cantidad
                cart.products[productIndex].quantity += quantity;
            } else {
                // Si no existe, agregarlo
                cart.products.push({ product: productId, quantity });
            }

            await cart.save();
            return await this.getCartById(cartId);
        } catch (error) {
            throw new Error(`Error al agregar producto al carrito: ${error.message}`);
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = cart.products.filter(
                item => item.product.toString() !== productId
            );

            await cart.save();
            return await this.getCartById(cartId);
        } catch (error) {
            throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            if (quantity < 0) {
                throw new Error('La cantidad no puede ser negativa');
            }

            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(
                item => item.product.toString() === productId
            );

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            if (quantity === 0) {
                // Si la cantidad es 0, eliminar el producto
                cart.products.splice(productIndex, 1);
            } else {
                // Verificar stock
                const product = await ProductModel.findById(productId);
                if (product.stock < quantity) {
                    throw new Error('Stock insuficiente');
                }
                cart.products[productIndex].quantity = quantity;
            }

            await cart.save();
            return await this.getCartById(cartId);
        } catch (error) {
            throw new Error(`Error al actualizar cantidad: ${error.message}`);
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = [];
            await cart.save();
            return await this.getCartById(cartId);
        } catch (error) {
            throw new Error(`Error al vaciar carrito: ${error.message}`);
        }
    }

    async deleteCart(cartId) {
        try {
            const cart = await CartModel.findByIdAndDelete(cartId).lean();
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw new Error(`Error al eliminar carrito: ${error.message}`);
        }
    }
}

export default CartManager;
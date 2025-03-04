import fs from "fs";
import ProductManager from "./ProductManager.js";

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async getCarts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, "utf-8");
            return data ? JSON.parse(data) : [];
        } catch (error) {
            throw new Error("Error al obtener carritos: " + error.message);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === id);
            if (!cart) throw new Error("Carrito no encontrado");
            return cart;
        } catch (error) {
            throw new Error("Error al obtener carrito por ID: " + error.message);
        }
    }

    async createCart() {
        try {
            const carts = await this.getCarts();
            const newCart = { id: carts.length + 1, products: [] };
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            throw new Error("Error al crear carrito: " + error.message);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === cartId);
            if (!cart) throw new Error("Carrito no encontrado");

            const product = await ProductManager.getProductById(productId);
            if (!product) throw new Error("Producto no encontrado");

            const productIndex = cart.products.findIndex(p => p.product === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;
        } catch (error) {
            throw new Error("Error al agregar producto al carrito: " + error.message);
        }
    }
}

export default new CartManager("src/data/carts.json");
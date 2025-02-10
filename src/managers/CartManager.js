// Importa el módulo de sistema de archivos 'fs' para manejar operaciones de archivos
import fs from "fs";
import ProductManager from "./ProductManager.js"; // Importamos ProductManager para validar productos

// Definición de la clase CartManager
class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    // Método para obtener todos los carritos con manejo de errores
    async getCarts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, "utf-8");
            return data ? JSON.parse(data) : []; // Si el archivo está vacío, retorna un array vacío
        } catch (error) {
            console.error("Error al leer los carritos:", error);
            return [];
        }
    }

    // Método para obtener un carrito por su ID
    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === id) || null;
    }

    // Método para crear un nuevo carrito con control de ID
    async createCart() {
        const carts = await this.getCarts();
        
        // Encuentra el ID más alto y suma 1, en caso de que haya carritos eliminados
        const newId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
        const newCart = { id: newId, products: [] };
        
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    // Método para agregar un producto a un carrito con validación de existencia
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) return { error: "Carrito no encontrado" };
    
        // Verifica si el producto realmente existe en products.json
        const product = await ProductManager.getProductById(productId);
        if (!product) return { error: "Producto no encontrado" };
    
        // Busca el producto en el carrito por su ID
        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
    
        // Escribe los carritos actualizados en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    
        return cart;
    }
}

// Exporta una instancia de CartManager inicializada con la ruta al archivo de carritos
export default new CartManager("src/data/carts.json"); 


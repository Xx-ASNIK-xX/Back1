// Importa el módulo de sistema de archivos 'fs' para manejar operaciones de archivos
import fs from "fs";

// Definición de la clase ProductManager
class ProductManager {
    // Constructor que inicializa la ruta del archivo donde se almacenan los productos
    constructor(filePath) {
        this.path = filePath;
    }

    // Método para obtener todos los productos
    async getProducts() {
        if (!fs.existsSync(this.path)) return [];
        const data = await fs.promises.readFile(this.path, "utf-8");
        return data.trim() ? JSON.parse(data) : []; // Si está vacío, devuelve []
    }

    // Método para obtener un producto por su ID
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id) || null;
    }

    // Método para agregar un nuevo producto
    async addProduct(product) {
        const products = await this.getProducts();
        const maxId = products.length ? Math.max(...products.map(p => p.id)) : 0;
        product.id = maxId + 1; // Asegura que el ID siempre sea único y creciente
    
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return product;
    }

    // Método para actualizar un producto existente
    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...updatedFields, id };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(p => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return true;
    }
}

// Exporta una instancia de ProductManager inicializada con la ruta al archivo de productos
export default new ProductManager("src/data/products.json")
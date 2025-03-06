import fs from "fs";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, "utf-8");
            return data.trim() ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error al obtener productos:", error);
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id) || null;
    }

    async addProduct(productData) {
        try {
            const products = await this.getProducts();
    
            // Generar un ID único
            const generateUniqueId = () => {
                const maxId = products.length ? Math.max(...products.map(p => p.id)) : 0;
                return maxId + 1;
            };
    
            // Agregar el producto con un ID único
            const newProduct = {
                id: generateUniqueId(), // ID único
                ...productData, // Resto de los campos
            };
    
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            throw new Error("Error al agregar producto: " + error.message);
        }
    }

    async updateProduct(id, updatedFields) {
    try {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        // Actualizar campos sin modificar el ID
        products[productIndex] = { ...products[productIndex], ...updatedFields, id };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[productIndex];
    } catch (error) {
        throw new Error("Error al actualizar producto: " + error.message);
    }
}

async deleteProduct(productId) {
    try {
        const products = await this.getProducts();
        const updatedProducts = products.filter(p => p.id !== productId);

        if (products.length === updatedProducts.length) {
            throw new Error("Producto no encontrado");
        }

        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
        return { success: true, message: "Producto eliminado correctamente" };
    } catch (error) {
        throw new Error("Error al eliminar producto: " + error.message);
    }
}
}

export default new ProductManager("src/data/products.json");
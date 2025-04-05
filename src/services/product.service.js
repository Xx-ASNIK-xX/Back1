import ProductManager from '../managers/ProductManager.js';
import ProductDTO from '../dto/product.dto.js';

class ProductService {
    constructor() {
        this.productManager = new ProductManager();
    }

    async getProducts(options = {}) {
        const result = await this.productManager.getProducts(options);
        return {
            ...result,
            docs: result.docs.map(product => ProductDTO.toResponse(product))
        };
    }

    async getProductById(id) {
        const product = await this.productManager.getProductById(id);
        return ProductDTO.toResponse(product);
    }

    async createProduct(productData) {
        const modelData = ProductDTO.toModel(productData);
        const newProduct = await this.productManager.createProduct(modelData);
        return ProductDTO.toResponse(newProduct);
    }

    async updateProduct(id, productData) {
        const modelData = ProductDTO.toModel(productData);
        const updatedProduct = await this.productManager.updateProduct(id, modelData);
        return ProductDTO.toResponse(updatedProduct);
    }

    async deleteProduct(id) {
        const deletedProduct = await this.productManager.deleteProduct(id);
        return ProductDTO.toResponse(deletedProduct);
    }

    async getProductsByCategory(category) {
        const products = await this.productManager.getProductsByCategory(category);
        return products.map(product => ProductDTO.toResponse(product));
    }

    async searchProducts(query) {
        const products = await this.productManager.searchProducts(query);
        return products.map(product => ProductDTO.toResponse(product));
    }

    async updateStock(id, stock) {
        const updatedProduct = await this.productManager.updateStock(id, stock);
        return ProductDTO.toResponse(updatedProduct);
    }
}

export default ProductService; 
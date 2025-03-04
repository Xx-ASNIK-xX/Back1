import productManager from "../managers/ProductManager.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productManager.getProductById(Number(req.params.pid));
        if (!product) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || !price || stock === undefined || !category) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Validar que el código sea único
        const products = await productManager.getProducts();
        if (products.some(p => p.code === code)) {
            return res.status(400).json({ error: "El código del producto ya existe" });
        }

        const newProduct = await productManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id, ...updatedFields } = req.body;
        const updatedProduct = await productManager.updateProduct(Number(req.params.pid), updatedFields);

        if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProduct(Number(pid));
        
        // Respuesta con mensaje de éxito
        res.status(200).json({  message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto", details: error.message });
    }
};
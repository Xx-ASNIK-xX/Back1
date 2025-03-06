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

        // Validar campos obligatorios
        if (!title || !description || !code || !price || stock === undefined || !category) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Generar un código único si no se proporciona o si ya existe
        const generateUniqueCode = () => {
            return `PROD-${Math.random().toString(36).substring(2, 9)}`; // Ejemplo: PROD-abc1234
        };

        let finalCode = code; // Usar el código proporcionado por el usuario
        const products = await productManager.getProducts();

        // Si el código ya existe, generar uno nuevo
        if (products.some(p => p.code === finalCode)) {
            finalCode = generateUniqueCode();
        }

        // Crear el producto
        const newProduct = await productManager.addProduct({
            title,
            description,
            code,
            price,
            status: status !== undefined ? status : true, // Por defecto true si no se proporciona
            stock,
            category,
            thumbnails: thumbnails || [], // Arreglo vacío si no se proporciona
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto", details: error.message });
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
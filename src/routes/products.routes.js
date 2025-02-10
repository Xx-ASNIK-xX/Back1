// Importa el módulo Router de express e importa productManager desde el archivo ProductManager.js
import { Router } from "express";
import productManager from "../managers/ProductManager.js";

// Crea una nueva instancia de Router
const router = Router();

// Define una ruta GET para obtener todos los productos
router.get("/", async (req, res) => {
    const products = await productManager.getProducts(); 
    res.json(products); // Envía los productos como respuesta en formato JSON
});

// Define una ruta GET para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(Number(req.params.pid)); 
    product ? res.json(product) : res.status(404).json({ error: "Producto no encontrado" }); 
});

// Define una ruta POST para agregar un nuevo producto
router.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body; 

    
    if (!title || !description || !code || !price || stock === undefined || !category) {
        return res.status(400).json({ error: "Faltan campos obligatorios" }); // Envía un error 400 si faltan campos
    }

    const newProduct = await productManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct); // Envía el nuevo producto creado como respuesta
});

// Define una ruta PUT para actualizar un producto existente
router.put("/:pid", async (req, res) => {
    const { id, ...updatedFields } = req.body; // Removemos el ID para que no se modifique

    const updatedProduct = await productManager.updateProduct(Number(req.params.pid), updatedFields); 
    updatedProduct ? res.json(updatedProduct) : res.status(404).json({ error: "Producto no encontrado" }); // Envía el producto actualizado o un error 404 si no se encuentra
});

// Define una ruta DELETE para eliminar un producto por su ID
router.delete("/:pid", async (req, res) => {
    await productManager.deleteProduct(Number(req.params.pid));
    res.status(204).send(); // Envía una respuesta 204 sin contenido
});

export default router;
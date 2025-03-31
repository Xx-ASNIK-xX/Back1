import { Router } from 'express';
import * as productController from '../controllers/products.controller.js';

const router = Router();

// Rutas GET
router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);

// Ruta POST para crear un nuevo producto
router.post('/', productController.createProduct);

// Ruta PUT para actualizar un producto
router.put('/:pid', productController.updateProduct);

// Ruta DELETE para eliminar un producto
router.delete('/:pid', productController.deleteProduct);

export default router;
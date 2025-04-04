import { Router } from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/products.controller.js';
import { validateProduct, validateId } from '../middlewares/validation.middleware.js';

const router = Router();

// Rutas GET
router.get('/', getProducts);
router.get('/:id', validateId, getProductById);

// Ruta POST para crear un nuevo producto
router.post('/', validateProduct, createProduct);

// Ruta PUT para actualizar un producto
router.put('/:id', validateId, validateProduct, updateProduct);

// Ruta DELETE para eliminar un producto
router.delete('/:id', validateId, deleteProduct);

export default router;
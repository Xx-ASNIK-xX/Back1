import express from 'express';
import multer from 'multer';
import { uploadImage, getImage, deleteImage } from '../controllers/image.controller.js';

const router = express.Router();

// Configuración de multer para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para subir una imagen
router.post('/upload', upload.single('image'), uploadImage);

// Ruta para obtener una imagen
router.get('/:imageId', getImage);

// Ruta para eliminar una imagen
router.delete('/:imageId', deleteImage);

export default router; 
import express from 'express';
import multer from 'multer';
import { uploadImage, getImage, deleteImage } from '../controllers/image.controller.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configurar multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        // Crear el directorio si no existe
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Validar tipos de archivo
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Solo se permiten imágenes'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // Límite de 5MB
    }
});

// Ruta para subir imágenes
router.post('/upload', upload.array('images', 5), (req, res) => {
    try {
        const urls = req.files.map(file => `/uploads/${file.filename}`);
        res.json({ status: 'success', urls });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            message: 'Error al subir las imágenes'
        });
    }
});

// Ruta para obtener una imagen
router.get('/:imageId', getImage);

// Ruta para eliminar una imagen
router.delete('/:imageId', deleteImage);

export default router; 
import express from 'express';
import multer from 'multer';
import imageModel from '../models/image.model.js';

const router = express.Router();

// Configuración de multer para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para subir una imagen
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
        }

        const imageId = await imageModel.uploadImage(req.file);
        res.json({ 
            success: true, 
            imageId: imageId.toString(),
            message: 'Imagen subida exitosamente' 
        });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
});

// Ruta para obtener una imagen
router.get('/:imageId', async (req, res) => {
    try {
        const imageStream = await imageModel.getImage(req.params.imageId);
        imageStream.pipe(res);
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).json({ error: 'Error al obtener la imagen' });
    }
});

// Ruta para eliminar una imagen
router.delete('/:imageId', async (req, res) => {
    try {
        await imageModel.deleteImage(req.params.imageId);
        res.json({ success: true, message: 'Imagen eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
});

export default router; 
import imageModel from '../models/image.model.js';

export const uploadImage = async (req, res) => {
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
};

export const getImage = async (req, res) => {
    try {
        const imageStream = await imageModel.getImage(req.params.imageId);
        imageStream.pipe(res);
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).json({ error: 'Error al obtener la imagen' });
    }
};

export const deleteImage = async (req, res) => {
    try {
        await imageModel.deleteImage(req.params.imageId);
        res.json({ success: true, message: 'Imagen eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
}; 
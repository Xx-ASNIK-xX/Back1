import ProductService from '../services/product.service.js';
import Logger from '../utils/logger.js';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/error.constants.js';
import { io } from '../app.js';

const productService = new ProductService();

export const getProducts = async (req, res, next) => {
    try {
        Logger.info('Obteniendo lista de productos');
        const result = await productService.getProducts(req.query);
        res.status(HTTP_STATUS.OK).json({ status: 'success', payload: result });
    } catch (error) {
        Logger.error('Error al obtener productos:', error);
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        Logger.info(`Buscando producto con ID: ${req.params.id}`);
        const product = await productService.getProductById(req.params.id);
        res.status(HTTP_STATUS.OK).json({ status: 'success', payload: product });
    } catch (error) {
        Logger.error(`Error al obtener producto ${req.params.id}:`, error);
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        Logger.info('Creando nuevo producto');
        const newProduct = await productService.createProduct(req.body);
        res.status(HTTP_STATUS.CREATED).json({ status: 'success', payload: newProduct });
    } catch (error) {
        Logger.error('Error al crear producto:', error);
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        Logger.info(`Actualizando producto con ID: ${req.params.id}`);
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        
        // Emitir evento de actualización de stock
        io.emit('stockUpdate', {
            productId: req.params.id,
            stock: updatedProduct.stock
        });

        res.status(HTTP_STATUS.OK).json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        Logger.error(`Error al actualizar producto ${req.params.id}:`, error);
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        Logger.info(`Eliminando producto con ID: ${req.params.id}`);
        const deletedProduct = await productService.deleteProduct(req.params.id);
        res.status(HTTP_STATUS.OK).json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        Logger.error(`Error al eliminar producto ${req.params.id}:`, error);
        next(error);
    }
};

export const updateStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        Logger.info(`Actualizando stock del producto ${id} a ${stock} unidades`);
        
        const updatedProduct = await productService.updateStock(id, stock);
        
        // Log para verificar la emisión del evento
        console.log('Emitiendo evento stockUpdate:', {
            productId: id,
            stock: updatedProduct.stock
        });
        
        // Emitir evento de actualización de stock
        io.emit('stockUpdate', {
            productId: id,
            stock: updatedProduct.stock
        });

        res.status(HTTP_STATUS.OK).json({ 
            status: 'success', 
            payload: updatedProduct 
        });
    } catch (error) {
        Logger.error(`Error al actualizar stock del producto ${req.params.id}:`, error);
        next(error);
    }
};
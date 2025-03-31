import ProductModel from '../models/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const getProducts = async (req, res) => {
    try {
        const { 
            limit = 10, 
            page = 1, 
            sort, 
            category,
            status 
        } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        // Construir el objeto de filtro
        const query = {};
        if (category) query.category = category;
        if (status !== undefined) query.status = status === 'true';

        const result = await ProductModel.paginate(query, options);

        // Construir los links para navegación
        const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;
        const buildUrl = (page) => {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);
            if (sort) params.append('sort', sort);
            if (category) params.append('category', category);
            if (status !== undefined) params.append('status', status);
            return `${baseUrl}?${params.toString()}`;
        };

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildUrl(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildUrl(result.nextPage) : null
        });
    } catch (error) {
        console.error('Error en getProducts:', error);
        res.status(500).json({ 
            status: 'error', 
            error: 'Error al obtener los productos' 
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).lean();
        if (!product) {
            return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        }
        res.json({ status: 'success', payload: product });
    } catch (error) {
        console.error('Error en getProductById:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = await ProductModel.create(req.body);
        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        console.error('Error en createProduct:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.pid,
            req.body,
            { new: true }
        ).lean();

        if (!updatedProduct) {
            return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        }

        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        console.error('Error en updateProduct:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.pid).lean();
        
        if (!deletedProduct) {
            return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        }

        res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        console.error('Error en deleteProduct:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};
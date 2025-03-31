import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import CartModel from '../models/cart.model.js';
import Handlebars from 'handlebars';

const router = Router();

// Registrar helpers de Handlebars
Handlebars.registerHelper('multiply', (a, b) => a * b);
Handlebars.registerHelper('cartTotal', (products) => {
    return products.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
});
Handlebars.registerHelper('eq', (a, b) => a === b);

// Vista de productos con paginación
router.get('/products', async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
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
        
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
        
        // Construir los links para navegación
        const buildUrl = (page) => {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);
            if (sort) params.append('sort', sort);
            if (category) params.append('category', category);
            if (status !== undefined) params.append('status', status);
            return `${baseUrl}?${params.toString()}`;
        };

        res.render('products', {
            products: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildUrl(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildUrl(result.nextPage) : null,
            categories: await ProductModel.distinct('category'),
            // Mantener los valores seleccionados
            selectedCategory: category,
            selectedStatus: status,
            sort,
            limit
        });
    } catch (error) {
        console.error('Error en /products:', error);
        res.status(500).render('error', { error: 'Error al cargar los productos' });
    }
});

// Vista de detalle de producto
router.get('/products/:pid', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).lean();
        if (!product) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.render('product-detail', { product });
    } catch (error) {
        console.error('Error en /products/:pid:', error);
        res.status(500).render('error', { error: 'Error al cargar el producto' });
    }
});

// Vista de carrito
router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.cid)
            .populate('products.product')
            .lean();
        
        if (!cart) {
            return res.status(404).render('error', { error: 'Carrito no encontrado' });
        }

        res.render('cart', { cart });
    } catch (error) {
        console.error('Error en /carts/:cid:', error);
        res.status(500).render('error', { error: 'Error al cargar el carrito' });
    }
});

export default router; 
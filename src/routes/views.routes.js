import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import CartModel from '../models/cart.model.js';

const router = Router();

// Vista de productos con paginación
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        const filter = {};
        if (query) {
            filter.category = query;
        }

        const result = await ProductModel.paginate(filter, options);
        
        // Obtener categorías únicas para el filtro
        const categories = await ProductModel.distinct('category');

        res.render('products', {
            products: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
            categories,
            sort,
            query
        });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
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
        res.status(500).render('error', { error: error.message });
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

        // Calcular el total del carrito
        const total = cart.products.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        res.render('cart', { cart, total });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

export default router;
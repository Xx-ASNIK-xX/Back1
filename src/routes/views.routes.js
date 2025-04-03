import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import CartModel from '../models/cart.model.js';

const router = Router();

// Vista de productos con paginación
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        const result = await ProductModel.paginate({}, options);
        
        console.log('Productos y sus imágenes:');
        result.docs.forEach(product => {
            console.log(`${product.title}:`, product.thumbnails);
        });

        res.render('products', {
            products: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}` : null,
            sort
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

        res.render('cart', { cart });
    } catch (error) {
        console.error('Error en /carts/:cid:', error);
        res.status(500).render('error', { error: 'Error al cargar el carrito' });
    }
});

export default router;
import ProductManagerClass from '../managers/ProductManager.js';
import CartModel from '../models/cart.model.js';

const productManager = new ProductManagerClass();

const getHomeView = async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        console.error('Error al cargar la vista home:', error);
        res.status(500).render('error', { error: 'Error al cargar la página principal' });
    }
};

const getRealTimeProductsView = async (req, res) => {
    try {
        const products = await productManager.getProducts({ limit: 100 });
        res.render('realTimeProducts', { products: products.docs });
    } catch (error) {
        console.error('Error al cargar la vista de productos en tiempo real:', error);
        res.status(500).render('error', { error: 'Error al cargar los productos en tiempo real' });
    }
};

const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, category } = req.query;
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
            query: category ? { category } : {}
        };

        const result = await productManager.getProducts(options);
        
        res.render('products', {
            products: result.docs,
            pagination: {
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}&sort=${sort || ''}&category=${category || ''}` : null,
                nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}&sort=${sort || ''}&category=${category || ''}` : null
            }
        });
    } catch (error) {
        console.error('Error al cargar la vista de productos:', error);
        res.status(500).render('error', { error: 'Error al cargar los productos' });
    }
};

const getProductDetail = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        res.render('productDetail', { product });
    } catch (error) {
        console.error('Error al cargar el detalle del producto:', error);
        res.status(500).render('error', { error: 'Error al cargar el detalle del producto' });
    }
};

const getCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartModel.findById(cid).populate('products.product');
        if (!cart) {
            return res.status(404).render('error', { error: 'Carrito no encontrado' });
        }
        res.render('cart', { cart });
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        res.status(500).render('error', { error: 'Error al cargar el carrito' });
    }
};

export default {
    getHomeView,
    getRealTimeProductsView,
    getProducts,
    getProductDetail,
    getCart
};

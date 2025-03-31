import ProductModel from '../models/product.model.js';

const socketEvents = (io) => {
    io.on('connection', async (socket) => {
        console.log('Nuevo cliente conectado');

        try {
            // Enviar productos al cliente cuando se conecta
            const products = await ProductModel.find().lean();
            socket.emit('products', products);

            // Manejar evento de nuevo producto
            socket.on('new-product', async (data) => {
                try {
                    const newProduct = await ProductModel.create(data);
                    const updatedProducts = await ProductModel.find().lean();
                    io.emit('products', updatedProducts);
                } catch (error) {
                    console.error('Error al crear nuevo producto:', error);
                    socket.emit('error', { message: 'Error al crear el producto' });
                }
            });

            // Manejar evento de eliminación de producto
            socket.on('delete-product', async (productId) => {
                try {
                    await ProductModel.findByIdAndDelete(productId);
                    const updatedProducts = await ProductModel.find().lean();
                    io.emit('products', updatedProducts);
                } catch (error) {
                    console.error('Error al eliminar producto:', error);
                    socket.emit('error', { message: 'Error al eliminar el producto' });
                }
            });

        } catch (error) {
            console.error('Error al obtener productos:', error);
            socket.emit('error', { message: 'Error al cargar los productos' });
        }

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};

export default socketEvents; 
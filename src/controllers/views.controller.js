import productManager from "../managers/ProductManager.js";

export const getHomeView = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { title: "Home", products }); // Renderiza la vista "home.handlebars"
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

export const getRealTimeProductsView = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("realTimeProducts", { title: "Productos en Tiempo Real", products }); // Renderiza la vista "realTimeProducts.handlebars"
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();

app.use(express.json()); // Para leer JSON en requests

// Agregar la ruta para manejar GET /
app.get('/', (req, res) => {
    res.send('¡Primera Entrega!');
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
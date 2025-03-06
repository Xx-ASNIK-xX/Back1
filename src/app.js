import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js"; // Router para las vistas
import productManager from "./managers/ProductManager.js"; // Importa el manager de productos


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json()); // Para leer JSON en requests

// Agregar la ruta para manejar GET /
app.get('/', (req, res) => {
    res.send('¡Primera Entrega!');
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

// Middleware para archivos estáticos
app.use(express.static("./src/public"));

// Router para las vistas
app.use("/", viewsRouter);

// WebSocket
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // Escucha eventos para crear o eliminar productos
    socket.on("createProduct", async (productData) => {
        try {
            const newProduct = await productManager.addProduct(productData);
            io.emit("updateProducts", await productManager.getProducts());
        } catch (error) {
            console.error("Error al crear producto:", error.message);
        }
    });

    // Escucha eventos para eliminar productos
    socket.on("deleteProduct", async (productId) => {
      try {
          console.log("Eliminando producto con ID:", productId); // Depuración
          await productManager.deleteProduct(Number(productId)); // Convierte el ID a número
          io.emit("updateProducts", await productManager.getProducts());
      } catch (error) {
          console.error("Error al eliminar producto:", error.message);
      }
    });
});

// Iniciar servidor
const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

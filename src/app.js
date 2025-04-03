import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import socketEvents from "./websocket/socket.js";
import { configureHandlebars } from "./config/handlebars.config.js";
import imageRoutes from './routes/image.routes.js';

// Configuración de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Handlebars
configureHandlebars(app);
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de archivos estáticos
app.use(express.static('src/public'));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use('/api/images', imageRoutes);

// Conexión a MongoDB
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");
} catch (error) {
    console.error("Error al conectar a MongoDB:", error);
}

// Iniciar servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Configurar Socket.IO
const io = new Server(httpServer);
socketEvents(io);

export default app;

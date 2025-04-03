import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import imageRoutes from './routes/image.routes.js';
import socketEvents from "./websocket/socket.js";
import { configureHandlebars } from "./config/handlebars.config.js";

// Configuración de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// Configurar Handlebars
configureHandlebars(app);
app.set("views", path.join(__dirname, "views"));

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
    process.exit(1);
}

// Iniciar servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Configurar Socket.IO
const io = new Server(httpServer);
socketEvents(io);

export default app;

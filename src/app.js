import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import socketEvents from "./websocket/socket.js";

// Configuración de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración de Handlebars
app.engine("handlebars", engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        eq: function (a, b) {
            return a === b;
        },
        multiply: function(a, b) {
            return a * b;
        },
        cartTotal: function(products) {
            return products.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0);
        },
        formatPrice: function(price) {
            return new Intl.NumberFormat('es-CO', { 
                style: 'currency', 
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price);
        }
    }
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

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

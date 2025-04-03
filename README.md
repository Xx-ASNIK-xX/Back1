# 🏍️ E-commerce de Motos - Backend API

## 📝 Descripción
Este proyecto es un e-commerce backend desarrollado con Node.js, Express y MongoDB, enfocado en la venta de motocicletas. Implementa una API RESTful con funcionalidades de productos y carrito de compras, incluyendo WebSockets para actualizaciones en tiempo real.

## 🎯 Objetivos Alcanzados
- Implementación de API RESTful completa
- Integración con MongoDB para persistencia de datos
- Sistema de carrito de compras funcional
- Actualizaciones en tiempo real con WebSockets
- Interfaz de usuario con Handlebars
- Manejo robusto de errores
- Validaciones de datos
- Paginación y filtros de productos

## 🛠️ Tecnologías Utilizadas
- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- Handlebars
- Bootstrap

## 📦 Estructura del Proyecto
```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── products.controller.js
│   └── carts.controller.js
├── models/
│   ├── product.model.js
│   └── cart.model.js
├── routes/
│   ├── products.routes.js
│   ├── carts.routes.js
│   └── views.routes.js
├── views/
│   ├── products.handlebars
│   ├── cart.handlebars
│   └── realtimeproducts.handlebars
├── websocket/
│   └── socket.js
└── app.js
```

## 🚀 Funcionalidades Implementadas

### Productos
- Listado con paginación
- Filtrado por categoría
- Ordenamiento por precio
- Búsqueda en tiempo real
- Gestión completa (CRUD)

### Carrito
- Agregar/eliminar productos
- Actualizar cantidades
- Cálculo de totales
- Persistencia de datos
- Validaciones de stock

### WebSockets
- Actualizaciones en tiempo real
- Notificaciones instantáneas
- Sincronización de datos

## 💡 Proceso de Desarrollo
1. Configuración inicial del proyecto y dependencias
2. Implementación de modelos y esquemas
3. Desarrollo de controladores y rutas
4. Integración de WebSockets
5. Creación de vistas con Handlebars
6. Implementación de validaciones y manejo de errores
7. Pruebas y depuración
8. Optimización y mejoras finales

## 🙏 Agradecimientos
Quiero expresar mi más sincero agradecimiento a los profesores que me guiaron en este proceso de aprendizaje:

- **Profesor Mauricio Gastón Lúquez**: Por su invaluable guía y paciencia en la enseñanza de los conceptos fundamentales de desarrollo backend.
- **Profesor adjunto Lucia Nerea Gigena**: Por compartir su experiencia y conocimientos en el desarrollo de aplicaciones web y por su apoyo constante y retroalimentación constructiva.

Este proyecto representa no solo un logro técnico, sino también el resultado de su dedicación y compromiso con la enseñanza.

## 📚 Aprendizajes Clave
- Arquitectura de aplicaciones backend
- Manejo de bases de datos NoSQL
- Comunicación en tiempo real
- Diseño de APIs RESTful
- Manejo de errores y validaciones
- Desarrollo de interfaces de usuario
- Trabajo con WebSockets

## 🎓 Conclusión
Este proyecto ha sido una experiencia enriquecedora que me permitió aplicar los conocimientos adquiridos en el curso y desarrollar habilidades prácticas en el desarrollo backend. La implementación de tecnologías modernas y mejores prácticas de desarrollo ha resultado en una aplicación robusta y escalable.

## 📄 Licencia
Este proyecto está bajo la Licencia MIT.

## 🎨 Nuevas Funcionalidades

### Sistema de Imágenes
- Almacenamiento de imágenes en MongoDB usando GridFS
- Carrusel de imágenes para cada producto
- Visualización de múltiples imágenes por producto
- Navegación entre imágenes con flechas personalizadas
- Transición automática de imágenes

### Gestión de Productos
- Visualización detallada de productos
- Sistema de ordenamiento
- Paginación de resultados
- Actualización en tiempo real usando WebSockets
- Gestión completa de productos (CRUD)

### Base de Datos
- Integración con MongoDB Atlas
- Sistema GridFS para almacenamiento de imágenes
- Modelos optimizados para productos y usuarios
- Scripts de utilidad para gestión de datos

## 🚀 Scripts Disponibles

### Scripts del Cliente (`src/public/js/`)
- `realTimeProducts.js`: Actualización en tiempo real de productos

### Scripts de Utilidad (`src/scripts/`)
- **Data:**
  - `addMotorcycles.js`: Agrega nuevas motocicletas
  - `countProducts.js`: Estadísticas de productos
  - `listProducts.js`: Lista productos en consola
  - `updateSingleProduct.js`: Actualiza productos individuales

- **Images:**
  - `migrateImages.js`: Migra imágenes a GridFS
  - `updateImages.js`: Actualiza URLs de imágenes
  - `updateMotorcyclesImages.js`: Actualiza imágenes de motos
  - `updateRemainingBikes.js`: Actualiza imágenes pendientes

## 🚀 Instalación

1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno en `.env`
```
MONGODB_URI=tu_uri_de_mongodb
PORT=8080
```

4. Iniciar el servidor
```bash
npm run dev
```

## 🚀 Uso

### Endpoints Principales

- `GET /products`: Lista de productos
- `GET /products/:id`: Detalle de producto
- `POST /products`: Crear producto
- `PUT /products/:id`: Actualizar producto
- `DELETE /products/:id`: Eliminar producto

### Gestión de Imágenes

- `GET /api/images/:imageId`: Obtener imagen
- `POST /api/images/upload`: Subir nueva imagen

## 🚀 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit los cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT. 
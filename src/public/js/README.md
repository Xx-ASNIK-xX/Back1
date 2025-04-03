# Scripts del Cliente

Este directorio contiene los scripts JavaScript que se ejecutan en el navegador del cliente.

## Archivos

### realTimeProducts.js
- **Propósito**: Maneja la actualización en tiempo real de productos usando WebSockets
- **Funcionalidades**:
  - Conexión con WebSocket (`socket.io`)
  - Actualización en tiempo real de la lista de productos
  - Manejo del formulario para crear productos
  - Función para eliminar productos
- **Uso**: Este script se carga en las páginas que necesitan actualizaciones en tiempo real
- **Dependencias**: Requiere que socket.io esté disponible en el cliente

## Notas Importantes

1. Estos scripts son cargados directamente por el navegador
2. No incluir aquí scripts del servidor o de utilidades
3. Los scripts del servidor deben ir en `src/scripts/`
4. Mantener este directorio solo para código que se ejecuta en el navegador

## Ejemplos de Uso

### Implementación en HTML
```html
<!-- Primero cargar socket.io -->
<script src="/socket.io/socket.io.js"></script>

<!-- Luego cargar nuestro script -->
<script src="/js/realTimeProducts.js"></script>
```

### Eventos WebSocket Disponibles
- `updateProducts`: Recibe actualizaciones de la lista de productos
- `createProduct`: Envía un nuevo producto al servidor
- `deleteProduct`: Envía una solicitud para eliminar un producto 
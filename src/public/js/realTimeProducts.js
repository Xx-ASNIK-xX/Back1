const socket = io();

// Función para eliminar un producto
window.deleteProduct = (productId) => {
    console.log("Intentando eliminar producto con ID:", productId); // Depuración
    socket.emit("deleteProduct", productId);
};

// Escucha el evento "updateProducts" para actualizar la lista
socket.on("updateProducts", (products) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = products
        .map(
            (product) => `
            <li>
                ${product.title} - $${product.price}
                <button onclick="deleteProduct('${product.id}')">Eliminar</button>
            </li>
        `
        )
        .join("");
});

// Envía el formulario para crear un producto
document.getElementById("createProductForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;
    socket.emit("createProduct", { title, price });
    e.target.reset();
});

// Función para eliminar un producto
window.deleteProduct = (productId) => {
    socket.emit("deleteProduct", productId);
};
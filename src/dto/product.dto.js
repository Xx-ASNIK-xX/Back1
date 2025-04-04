class ProductDTO {
    static toResponse(product) {
        return {
            id: product._id,
            title: product.title,
            price: product.price,
            stock: product.stock,
            category: product.category,
            status: product.status,
            thumbnails: product.thumbnails || []
        };
    }

    static toModel(productData) {
        return {
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: productData.price,
            status: productData.status ?? true,
            stock: productData.stock,
            category: productData.category,
            thumbnails: productData.thumbnails || []
        };
    }
}

export default ProductDTO; 
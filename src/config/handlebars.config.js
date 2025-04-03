import { engine } from 'express-handlebars';

export const handlebarsConfig = {
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        eq: function (a, b) {
            return a === b;
        },
        multiply: function(a, b) {
            if (!a || !b) return 0;
            return a * b;
        },
        cartTotal: function(products) {
            if (!Array.isArray(products)) return 0;
            return products.reduce((total, item) => {
                if (!item || !item.product || !item.product.price || !item.quantity) return total;
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
};

export const configureHandlebars = (app) => {
    app.engine("handlebars", engine(handlebarsConfig));
    app.set("view engine", "handlebars");
    app.set("views", "./src/views");
}; 
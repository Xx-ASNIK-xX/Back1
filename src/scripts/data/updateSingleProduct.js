import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from '../../models/product.model.js';

dotenv.config();

const updates = [
    {
        code: "YYZF-R1M",
        images: [
            "https://cdn.pixabay.com/photo/2015/07/07/11/36/yamaha-834386_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/07/07/11/36/yamaha-834388_1280.jpg"
        ]
    },
    {
        code: "BS1000RR",
        images: [
            "https://cdn.pixabay.com/photo/2016/02/19/11/25/motorcycle-1209698_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/02/19/11/25/motorcycle-1209699_1280.jpg"
        ]
    },
    {
        code: "MVF4RC",
        images: [
            "https://cdn.pixabay.com/photo/2016/03/27/17/59/motorcycle-1283297_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/03/27/17/59/motorcycle-1283298_1280.jpg"
        ]
    },
    {
        code: "KRC8C",
        images: [
            "https://cdn.pixabay.com/photo/2015/05/15/14/38/motorcycle-768474_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/05/15/14/38/motorcycle-768475_1280.jpg"
        ]
    },
    {
        code: "TST1200RS",
        images: [
            "https://cdn.pixabay.com/photo/2015/09/08/21/02/superbike-931678_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/09/08/21/02/superbike-931679_1280.jpg"
        ]
    },
    {
        code: "YMT10SP",
        images: [
            "https://cdn.pixabay.com/photo/2015/07/07/11/36/yamaha-834387_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/07/07/11/36/yamaha-834389_1280.jpg"
        ]
    },
    {
        code: "HCB1000R",
        images: [
            "https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283300_1280.jpg"
        ]
    },
    {
        code: "KZH2SE",
        images: [
            "https://cdn.pixabay.com/photo/2016/06/13/07/59/motorcycle-1453866_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/06/13/07/59/motorcycle-1453867_1280.jpg"
        ]
    },
    {
        code: "ATV4F",
        images: [
            "https://cdn.pixabay.com/photo/2014/07/31/23/37/motorcycle-407189_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/07/31/23/37/motorcycle-407190_1280.jpg"
        ]
    },
    {
        code: "MVB1000RR",
        images: [
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831050_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831051_1280.jpg"
        ]
    }
];

async function updateProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');

        for (const update of updates) {
            const result = await ProductModel.updateOne(
                { code: update.code },
                { $set: { thumbnails: update.images } }
            );
            console.log(`Producto ${update.code} actualizado:`, result.modifiedCount > 0 ? 'Sí' : 'No');
        }

        console.log('Actualización completada');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateProducts(); 
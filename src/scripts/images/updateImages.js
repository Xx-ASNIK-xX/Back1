import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from '../../models/product.model.js';

dotenv.config();

const imageUpdates = [
    {
        code: "TRX450R",
        images: [
            "https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/09/08/21/02/superbike-931674_1280.jpg"
        ]
    },
    {
        code: "YFZ450R",
        images: [
            "https://cdn.pixabay.com/photo/2017/07/01/03/47/motorcycle-2460651_1280.jpg",
            "https://cdn.pixabay.com/photo/2017/07/01/03/47/bike-2460650_1280.jpg"
        ]
    },
    {
        code: "NINJA400",
        images: [
            "https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/06/13/07/59/motorcycle-1453863_1280.jpg"
        ]
    },
    {
        code: "MONSTER821",
        images: [
            "https://cdn.pixabay.com/photo/2014/07/31/23/37/motorbike-407186_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/07/31/23/37/motorcycle-407185_1280.jpg"
        ]
    },
    {
        code: "S1000RR",
        images: [
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831044_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831045_1280.jpg"
        ]
    },
    {
        code: "HCBR1000",
        images: [
            "https://cdn.pixabay.com/photo/2016/01/19/16/46/motorcycle-1149389_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/01/19/16/46/motorcycle-1149390_1280.jpg"
        ]
    },
    {
        code: "DPV4S",
        images: [
            "https://cdn.pixabay.com/photo/2016/03/27/19/29/motorcycle-1283638_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/03/27/19/29/motorcycle-1283639_1280.jpg"
        ]
    },
    {
        code: "KNZ10R",
        images: [
            "https://cdn.pixabay.com/photo/2015/05/15/14/38/motorcycle-768472_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/05/15/14/38/motorcycle-768473_1280.jpg"
        ]
    },
    {
        code: "ARSV4F",
        images: [
            "https://cdn.pixabay.com/photo/2014/12/16/03/37/motorcycle-569865_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/12/16/03/37/motorcycle-569866_1280.jpg"
        ]
    },
    {
        code: "SGSX1000R",
        images: [
            "https://cdn.pixabay.com/photo/2015/09/08/21/02/superbike-931676_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/09/08/21/02/superbike-931677_1280.jpg"
        ]
    },
    {
        code: "MVF4RC",
        images: [
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831046_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831047_1280.jpg"
        ]
    },
    {
        code: "KRC8C",
        images: [
            "https://cdn.pixabay.com/photo/2016/06/13/07/59/motorcycle-1453864_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/06/13/07/59/motorcycle-1453865_1280.jpg"
        ]
    },
    {
        code: "TST1200RS",
        images: [
            "https://cdn.pixabay.com/photo/2016/03/27/19/29/motorcycle-1283640_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/03/27/19/29/motorcycle-1283641_1280.jpg"
        ]
    },
    {
        code: "DSFV4S",
        images: [
            "https://cdn.pixabay.com/photo/2014/07/31/23/37/motorcycle-407187_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/07/31/23/37/motorcycle-407188_1280.jpg"
        ]
    },
    {
        code: "BM1000RR",
        images: [
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831048_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/07/04/19/56/motorcycle-831049_1280.jpg"
        ]
    }
];

async function updateImages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');

        for (const update of imageUpdates) {
            const result = await ProductModel.updateOne(
                { code: update.code },
                { $set: { thumbnails: update.images } }
            );
            console.log(`Producto ${update.code}: ${result.modifiedCount} documento actualizado`);
        }

        console.log('Actualización completada');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateImages(); 
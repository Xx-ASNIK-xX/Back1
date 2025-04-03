import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from '../../models/product.model.js';

dotenv.config();

const motorcycles = [
    {
        code: "HCBR1000",
        thumbnails: [
            "https://img.remediosdigitales.com/c6f5c9/honda-cbr1000rr-r-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/c6f5c9/honda-cbr1000rr-r-2020-2/1366_2000.jpg"
        ]
    },
    {
        code: "YYZF-R1M",
        thumbnails: [
            "https://img.remediosdigitales.com/c6e9d5/yamaha-yzf-r1m-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/c6e9d5/yamaha-r1m-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "DPV4S",
        thumbnails: [
            "https://img.remediosdigitales.com/7a9119/ducati-panigale-v4-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/7a9119/ducati-panigale-v4-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "KNZ10R",
        thumbnails: [
            "https://img.remediosdigitales.com/a89119/kawasaki-ninja-zx-10r-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/a89119/kawasaki-ninja-zx-10r-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "BS1000RR",
        thumbnails: [
            "https://img.remediosdigitales.com/b89119/bmw-s1000rr-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/b89119/bmw-s1000rr-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "ARSV4F",
        thumbnails: [
            "https://img.remediosdigitales.com/d89119/aprilia-rsv4-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/d89119/aprilia-rsv4-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "SGSX1000R",
        thumbnails: [
            "https://img.remediosdigitales.com/e89119/suzuki-gsx-r1000r-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/e89119/suzuki-gsx-r1000r-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "MVF4RC",
        thumbnails: [
            "https://img.remediosdigitales.com/f89119/mv-agusta-f4-rc-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/f89119/mv-agusta-f4-rc-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "KRC8C",
        thumbnails: [
            "https://img.remediosdigitales.com/g89119/ktm-rc-8c-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/g89119/ktm-rc-8c-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "TST1200RS",
        thumbnails: [
            "https://img.remediosdigitales.com/h89119/triumph-speed-triple-1200-rs-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/h89119/triumph-speed-triple-1200-rs-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "DSFV4S",
        thumbnails: [
            "https://img.remediosdigitales.com/i89119/ducati-streetfighter-v4-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/i89119/ducati-streetfighter-v4-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "BM1000RR",
        thumbnails: [
            "https://img.remediosdigitales.com/j89119/bmw-m1000rr-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/j89119/bmw-m1000rr-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "YMT10SP",
        thumbnails: [
            "https://img.remediosdigitales.com/k89119/yamaha-mt-10-sp-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/k89119/yamaha-mt-10-sp-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "HCB1000R",
        thumbnails: [
            "https://img.remediosdigitales.com/l89119/honda-cb1000r-black-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/l89119/honda-cb1000r-black-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "KZH2SE",
        thumbnails: [
            "https://img.remediosdigitales.com/m89119/kawasaki-z-h2-se-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/m89119/kawasaki-z-h2-se-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "ATV4F",
        thumbnails: [
            "https://img.remediosdigitales.com/n89119/aprilia-tuono-v4-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/n89119/aprilia-tuono-v4-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "MVB1000RR",
        thumbnails: [
            "https://img.remediosdigitales.com/o89119/mv-agusta-brutale-1000-rr-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/o89119/mv-agusta-brutale-1000-rr-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "DMSP",
        thumbnails: [
            "https://img.remediosdigitales.com/p89119/ducati-monster-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/p89119/ducati-monster-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "KSDR1290E",
        thumbnails: [
            "https://img.remediosdigitales.com/q89119/ktm-1290-super-duke-r-evo-2022-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/q89119/ktm-1290-super-duke-r-evo-2022-lateral/1366_2000.jpg"
        ]
    },
    {
        code: "SHAY2023",
        thumbnails: [
            "https://img.remediosdigitales.com/r89119/suzuki-hayabusa-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/r89119/suzuki-hayabusa-2021-lateral/1366_2000.jpg"
        ]
    }
];

const defaultImages = {
    "TRX450R": [
        "https://img.remediosdigitales.com/trx450r/honda-trx450r-front.jpg",
        "https://img.remediosdigitales.com/trx450r/honda-trx450r-side.jpg"
    ],
    "YFZ450R": [
        "https://img.remediosdigitales.com/yfz450r/yamaha-yfz450r-front.jpg",
        "https://img.remediosdigitales.com/yfz450r/yamaha-yfz450r-side.jpg"
    ],
    "NINJA400": [
        "https://img.remediosdigitales.com/ninja400/kawasaki-ninja-400-front.jpg",
        "https://img.remediosdigitales.com/ninja400/kawasaki-ninja-400-side.jpg"
    ],
    "MONSTER821": [
        "https://img.remediosdigitales.com/monster821/ducati-monster-821-front.jpg",
        "https://img.remediosdigitales.com/monster821/ducati-monster-821-side.jpg"
    ],
    "S1000RR": [
        "https://img.remediosdigitales.com/s1000rr/bmw-s1000rr-front.jpg",
        "https://img.remediosdigitales.com/s1000rr/bmw-s1000rr-side.jpg"
    ]
};

const updateMotorcyclesImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');

        for (const moto of motorcycles) {
            try {
                const result = await ProductModel.updateOne(
                    { code: moto.code },
                    { $set: { thumbnails: moto.thumbnails } }
                );
                
                if (result.modifiedCount > 0) {
                    console.log(`Imágenes actualizadas para moto con código: ${moto.code}`);
                } else {
                    console.log(`No se encontró moto con código: ${moto.code}`);
                }
            } catch (error) {
                console.error(`Error al actualizar moto ${moto.code}:`, error.message);
            }
        }

        // Actualizar productos con imágenes por defecto
        const products = await ProductModel.find({
            thumbnails: { $in: ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"] }
        });

        for (const product of products) {
            if (defaultImages[product.code]) {
                try {
                    const result = await ProductModel.updateOne(
                        { _id: product._id },
                        { $set: { thumbnails: defaultImages[product.code] } }
                    );
                    
                    if (result.modifiedCount > 0) {
                        console.log(`Imágenes actualizadas para producto con código: ${product.code}`);
                    }
                } catch (error) {
                    console.error(`Error al actualizar producto ${product.code}:`, error.message);
                }
            }
        }

        console.log('Proceso de actualización completado');
        process.exit(0);
    } catch (error) {
        console.error('Error de conexión:', error);
        process.exit(1);
    }
};

updateMotorcyclesImages(); 
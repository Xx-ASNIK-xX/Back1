import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from '../models/product.model.js';

dotenv.config();

const motorcycles = [
    {
        title: "Honda CBR1000RR-R Fireblade",
        description: "Superbike de alto rendimiento con 217 CV y tecnología derivada de MotoGP",
        code: "HCBR1000",
        price: 45000000,
        stock: 5,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/c6f5c9/honda-cbr1000rr-r-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/c6f5c9/honda-cbr1000rr-r-2020-2/1366_2000.jpg"
        ]
    },
    {
        title: "Yamaha YZF-R1M",
        description: "Moto deportiva con electrónica avanzada y componentes de competición",
        code: "YYZF-R1M",
        price: 42000000,
        stock: 3,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/c6e9d5/yamaha-yzf-r1m-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/c6e9d5/yamaha-r1m-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Ducati Panigale V4 S",
        description: "La máxima expresión de la tecnología deportiva italiana",
        code: "DPV4S",
        price: 48000000,
        stock: 4,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/7a9119/ducati-panigale-v4-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/7a9119/ducati-panigale-v4-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Kawasaki Ninja ZX-10R",
        description: "Campeona del Mundial de Superbikes con tecnología de pista",
        code: "KNZ10R",
        price: 39000000,
        stock: 6,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/a89119/kawasaki-ninja-zx-10r-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/a89119/kawasaki-ninja-zx-10r-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "BMW S1000RR",
        description: "Precisión alemana con 207 CV y paquete M",
        code: "BS1000RR",
        price: 43000000,
        stock: 4,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/b89119/bmw-s1000rr-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/b89119/bmw-s1000rr-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Aprilia RSV4 Factory",
        description: "Tecnología italiana de competición para la calle",
        code: "ARSV4F",
        price: 44000000,
        stock: 3,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/d89119/aprilia-rsv4-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/d89119/aprilia-rsv4-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Suzuki GSX-R1000R",
        description: "La evolución del icónico GSX-R con electrónica moderna",
        code: "SGSX1000R",
        price: 38000000,
        stock: 5,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/e89119/suzuki-gsx-r1000r-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/e89119/suzuki-gsx-r1000r-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "MV Agusta F4 RC",
        description: "Arte italiano sobre dos ruedas con prestaciones extremas",
        code: "MVF4RC",
        price: 52000000,
        stock: 2,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/f89119/mv-agusta-f4-rc-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/f89119/mv-agusta-f4-rc-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "KTM RC 8C",
        description: "Edición limitada lista para circuito",
        code: "KRC8C",
        price: 46000000,
        stock: 3,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/g89119/ktm-rc-8c-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/g89119/ktm-rc-8c-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Triumph Speed Triple 1200 RS",
        description: "Naked deportiva británica con motor de tres cilindros",
        code: "TST1200RS",
        price: 37000000,
        stock: 4,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/h89119/triumph-speed-triple-1200-rs-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/h89119/triumph-speed-triple-1200-rs-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Ducati Streetfighter V4 S",
        description: "La hipernaked italiana con ADN de Panigale",
        code: "DSFV4S",
        price: 41000000,
        stock: 5,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/i89119/ducati-streetfighter-v4-2020-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/i89119/ducati-streetfighter-v4-2020-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "BMW M1000RR",
        description: "Primera moto M de BMW con aerodinámica avanzada",
        code: "BM1000RR",
        price: 49000000,
        stock: 3,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/j89119/bmw-m1000rr-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/j89119/bmw-m1000rr-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Yamaha MT-10 SP",
        description: "La naked más potente de Yamaha con suspensión electrónica",
        code: "YMT10SP",
        price: 36000000,
        stock: 6,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/k89119/yamaha-mt-10-sp-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/k89119/yamaha-mt-10-sp-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Honda CB1000R Black Edition",
        description: "Estilo neo-retro con prestaciones modernas",
        code: "HCB1000R",
        price: 35000000,
        stock: 4,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/l89119/honda-cb1000r-black-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/l89119/honda-cb1000r-black-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Kawasaki Z H2 SE",
        description: "Naked supercharged con 200 CV",
        code: "KZH2SE",
        price: 40000000,
        stock: 4,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/m89119/kawasaki-z-h2-se-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/m89119/kawasaki-z-h2-se-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Aprilia Tuono V4 Factory",
        description: "La naked derivada de la RSV4",
        code: "ATV4F",
        price: 38000000,
        stock: 5,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/n89119/aprilia-tuono-v4-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/n89119/aprilia-tuono-v4-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "MV Agusta Brutale 1000 RR",
        description: "La naked más potente del mercado",
        code: "MVB1000RR",
        price: 45000000,
        stock: 3,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/o89119/mv-agusta-brutale-1000-rr-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/o89119/mv-agusta-brutale-1000-rr-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Ducati Monster SP",
        description: "La nueva generación del icónico Monster",
        code: "DMSP",
        price: 34000000,
        stock: 6,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/p89119/ducati-monster-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/p89119/ducati-monster-2021-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "KTM 1290 Super Duke R Evo",
        description: "La bestia austriaca con suspensión semi-activa",
        code: "KSDR1290E",
        price: 39000000,
        stock: 4,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/q89119/ktm-1290-super-duke-r-evo-2022-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/q89119/ktm-1290-super-duke-r-evo-2022-lateral/1366_2000.jpg"
        ]
    },
    {
        title: "Suzuki Hayabusa",
        description: "La leyenda de la velocidad renovada",
        code: "SHAY2023",
        price: 42000000,
        stock: 3,
        category: "motos",
        thumbnails: [
            "https://img.remediosdigitales.com/r89119/suzuki-hayabusa-2021-1/1366_2000.jpg",
            "https://img.remediosdigitales.com/r89119/suzuki-hayabusa-2021-lateral/1366_2000.jpg"
        ]
    }
];

const addMotorcycles = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');

        for (const moto of motorcycles) {
            try {
                await ProductModel.create(moto);
                console.log(`Moto agregada: ${moto.title}`);
            } catch (error) {
                if (error.code === 11000) {
                    console.log(`La moto ${moto.title} ya existe (código duplicado)`);
                } else {
                    console.error(`Error al agregar ${moto.title}:`, error.message);
                }
            }
        }

        console.log('Proceso completado');
        process.exit(0);
    } catch (error) {
        console.error('Error de conexión:', error);
        process.exit(1);
    }
};

addMotorcycles(); 
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRouter from './src/routers/userRouter.js';
import productRouter from './src/routers/productRouter.js';
import orderRouter from './src/routers/orderRouter.js';
import cartRouter from './src/routers/cartRouter.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Servir les fichiers statiques du dossier uploads du frontend
app.use('/uploads', express.static(path.join(__dirname, '../FRONTEND/public/uploads')));

mongoose.connect("mongodb://localhost:27017/Ecom_Project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('Successfully connected to MongoDB.');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
    console.log('server is running', `at http://localhost:${port}`);
});
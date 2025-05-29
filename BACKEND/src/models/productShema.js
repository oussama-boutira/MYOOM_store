import mongoose from "mongoose";
import { Schema } from "mongoose";
const productShema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
  
});
export const productModel = mongoose.model('products', productShema);
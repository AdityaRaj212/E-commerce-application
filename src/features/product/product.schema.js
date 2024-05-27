import mongoose, { mongo } from "mongoose";

export const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    inStock: Number,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'review'
        }
    ]
}) 
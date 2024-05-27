import mongoose from "mongoose";

export const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: Number
})
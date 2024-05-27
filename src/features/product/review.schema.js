import mongoose from "mongoose";

export const ReviewSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    rating: {
        type: Number
    }
})
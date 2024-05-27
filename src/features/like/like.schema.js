import mongoose from "mongoose";

export const LikeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'types'
    },
    types: {
        type: String,
        enum: ['product','category'] 
    }
})
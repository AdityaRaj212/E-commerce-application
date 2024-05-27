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
}).pre('save',(next)=>{
    console.log("New like coming in");
    next();
}).post('save',(doc)=>{
    console.log("Like is saved");
    console.log(doc);
}).pre('find',(next)=>{
    console.log("Retreiving likes");
    next();
}).post('find',(doc)=>{
    console.log("Find is completed");
    console.log(doc);
})
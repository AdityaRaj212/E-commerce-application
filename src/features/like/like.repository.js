import mongoose from "mongoose";
import { LikeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import { UserSchema } from "../user/user.schema.js";

const LikeModel = mongoose.model('like',LikeSchema);

export default class LikeRepository{

    async getLikes(id,type){
        return await LikeModel.find({
            likeable: new ObjectId(id),
            types: type
        }).populate('user').populate({path:'likeable', model: type})
    }

    async likeProduct(userId,productId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(productId),
                types: 'product'
            })
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong',500);
        }
    }

    async likeCategory(userId,categoryId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(categoryId),
                types: 'category'
            })
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong',500);
        }
    }
}
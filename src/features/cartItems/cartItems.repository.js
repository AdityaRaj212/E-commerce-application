import CartItemsModel from "./cartItems.model.js";
import { getDB } from "../../config/mongodb.js";
import applicationError from "../../error-handler/applicationError.js";
import { ObjectId, ReturnDocument } from "mongodb";

export default class cartItemsRepository{
    constructor(){
        this.collection = 'cartItems';
    }
    async add(userId,productId,quantity){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db);
            console.log(id);
            userId = new ObjectId(userId);
            productId = new ObjectId(productId);
            let new_item = new CartItemsModel(userId, productId, quantity);
            await collection.updateOne({
                productId: new ObjectId(productId),
                userId: new ObjectId(userId)
            },{
                $setOnInsert: {_id:id},
                $inc:{quantity:quantity}
            },{upsert:true});
            return new_item;
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async get(userId){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const userItems = await collection.find({userId:new ObjectId(userId)}).toArray();
            return userItems;
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async delete(userId,cartItemId){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.deleteOne({userId:new ObjectId(userId), _id:new ObjectId(cartItemId)})
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async getNextCounter(db){
        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id: 'cartItemId'},
            {$inc: {value:1}},
            {returnDocument:'after'}
        );
        console.log(resultDocument.value);
        return resultDocument.value;
    }
}
import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";
import applicationError from "../../error-handler/applicationError.js";

export default class OrderRepository{
    constructor(){
        this.collection = 'orders';
    }

    async placeOrder(userId){
        const db = getDB();
        const client = getClient();
        const session = client.startSession();
        try{
            session.startTransaction();
    
            // 1. Get cart items and calculate total payable amount
            const items = await this.getTotalAmount(userId, session);
            const netTotalAmount = items.reduce((acc,item)=>acc+item.totalAmount,0)
            console.log(netTotalAmount);
    
            // 2. Create an order record
            const newOrder = new OrderModel(new ObjectId(userId),netTotalAmount,new Date());
            db.collection(this.collection).insertOne(newOrder,{session});
    
            // 3. Reduce the stock
            for(let item of items){
                await db.collection('products').updateOne(
                    {_id: item.productId},
                    {$inc:{stock: -item.quantity}},
                    {session}
                )
            };
    
            // 4. Clear the cart items
            await db.collection('cartItems').deleteMany({
                userId: new ObjectId(userId)
            },{session});
    
            session.commitTransaction();
            session.endSession();
            return;
        }catch(err){
            console.log(err);
            await session.abortTransaction();
            session.endSession();
            throw new applicationError('Something went wrong',500);
        }
    }

    async getTotalAmount(userId, session){
        const db = getDB();
        const collection = db.collection('cartItems');
        const items = await collection.aggregate(
            [
                {
                    // 1. Get cart items for user
                    $match:{userId:new ObjectId(userId)}
                },
                {
                    // 2. Get the products from the products collection
                    $lookup:{
                        from:"products",
                        localField:"productId",
                        foreignField:"_id",
                        as:"productInfo"
                    }
                },
                {
                    // 3. Unwind the product info
                    $unwind:"$productInfo"
                },
                {
                    // 4. Calculate total amount for each product
                    $addFields:{
                        "totalAmount":{
                            $multiply:["$productInfo.price","$quantity"]
                        }
                    }
                }
            ],
            {session}
        ).toArray();
        return items;
    }
}
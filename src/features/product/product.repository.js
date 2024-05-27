import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"
import applicationError from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { ProductSchema } from "./product.schema.js";
import { ReviewSchema } from "./review.schema.js";
import { CategorySchema } from "./category.schema.js";

const ProductModel = mongoose.model('product',ProductSchema);
const ReviewModel = mongoose.model('review',ReviewSchema);
const CategoryModel = mongoose.model('category',CategorySchema);

export default class ProductRepository{
    constructor(){
        this.collection = 'products';
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            return products;
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async addProduct(product){
        try{
            product.categories = product.category.split(',').map(e=>e.trim());
            console.log(product);
            const newProduct = new ProductModel(product);
            await newProduct.save();

            await CategoryModel.updateMany(
                {
                    _id: {$in: product.categories}
                },
                {
                    $push: {products: new ObjectId(newProduct._id)}
                }
            ) 
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const product = await collection.findOne({_id:new ObjectId(id)});
            return product;
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async filter(minPrice,maxPrice,category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const filterConstraints = {};
            if(minPrice){
                filterConstraints.price = {$gte:parseFloat(minPrice)};
            }
            if(maxPrice){
                filterConstraints.price = {...filterConstraints.price,$lte:parseFloat(maxPrice)};
            }
            if(category){
                filterConstraints.category = category;
            }
            // project function is used to return details of only certain parameters
            // slice function is used to return only first n or last n elements of an array
            return await collection.find(filterConstraints).project({name:1, price:1, ratings:{$slice:1}}).toArray();
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async rateProduct(userId, productId, rating){
        try{
            const productToUpdate = await ProductModel.findById(productId);
            if(!productToUpdate){
                throw new Error('Product not found');
            }
            const userReview = await ReviewModel.findOne({
                product: new ObjectId(productId),
                user: new ObjectId(userId)
            });
            if(userReview){
                userReview.rating = rating;
                await userReview.save();
            }else{
                const newReview = new ReviewModel({
                    product: new ObjectId(productId),
                    user: new ObjectId(userId),
                    rating:  rating
                });
                await newReview.save();
            }
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async averageProductPricePerCategory(){
        try{
            const db = getDB();
            return await db.collection(this.collection).aggregate(
                [
                    {
                        // Stage 1: Get average price per category
                        $group:{
                            _id: "$category",
                            averagePrice: {$avg:"$price"}
                        }
                    }
                ]
            ).toArray();
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async highestNoOfReviews(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.aggregate(
                [
                    {
                        // 1. Project name and count of rating
                        $project:{
                            name:1,
                            countOfRating:{
                                $cond:{
                                    if:{
                                        $isArray: "$ratings"
                                    },
                                    then:{
                                        $size:"$ratings"
                                    },
                                    else: 0
                                }
                            }
                        }
                    },
                    {
                        // 2. Sort the collection
                        $sort: {countOfRating:-1}
                    },
                    {
                        // 3. Limit to just 1 item in result
                        $limit: 1
                    }
                ]
            ).toArray();
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }
}
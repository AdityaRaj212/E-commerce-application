import mongoose from "mongoose";
import { CategorySchema } from "../features/product/category.schema.js";
const url = process.env.DB_URL;

export const connectUsingMongoose = async ()=>{
    try{
        await mongoose.connect(url);
        console.log('MongoDB is connected using mongoose');
        addCategories();
    }catch(err){
        console.log('Error while connecting to db');
        console.log(err);
    }
}

async function addCategories(){
    const CategoryModel = mongoose.model('category',CategorySchema);
    const categories = await CategoryModel.find();
    if(!categories || categories.length==0){
        await CategoryModel.insertMany([{name:"Books"},{name:"Electronics"},{name:"Grocery"}]);
    }
    console.log('Categories are added');
}
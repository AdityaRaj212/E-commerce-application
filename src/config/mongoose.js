import mongoose from "mongoose";
const url = process.env.DB_URL;

export const connectUsingMongoose = async ()=>{
    try{
        await mongoose.connect(url);
        console.log('MongoDB is connected using mongoose')
    }catch(err){
        console.log('Error while connecting to db');
        console.log(err);
    }
}
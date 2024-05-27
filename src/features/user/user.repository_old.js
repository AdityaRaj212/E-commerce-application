import { getDB } from "../../config/mongodb.js";

export default class UserRepository{
    async signUp(new_user){
        try{
            // 1. Get the database
            const db = getDB();
    
            // 2. Get the collection
            const collection = db.collection("users");
    
            // 3. Insert the document
            await collection.insertOne(new_user);
            
            return new_user;
        }catch(err){
            throw new applicationError('Something went wrong',500);
        }
    }

    async signIn(email,password){
        try{
            // 1. Get the database
            const db = getDB();
    
            // 2. Get the collection
            const collection = db.collection("users");
    
            // 3. Insert the document
            return await collection.findOne({email,password});
        }catch(err){
            throw new applicationError('Something went wrong',500);
        }
    }

    async findByEmail(email){
        try{
            // 1. Get the database
            const db = getDB();
    
            // 2. Get the collection
            const collection = db.collection("users");
    
            // 3. Insert the document
            return await collection.findOne({email});
        }catch(err){
            throw new applicationError('Something went wrong',500);
        }
    }
}
import { MongoClient } from "mongodb";

// I replced localhost with 127.0.0.1 because my system user IPv4 instead of IPv6
const url = process.env.DB_URL;
let client;

export const connectToMongoDB = ()=>{
    MongoClient.connect(url).then((clientInstance)=>{
        client = clientInstance;
        console.log('MongoDB is connected');
        createCounter(client.db());
        createIndexes(client.db());
    }).catch((err)=>{
        console.log(err);
    })
}

export const getDB = ()=>{
    return client.db();
}

export const getClient = ()=>{
    return client;
}

const createCounter = async (db)=>{
    const existingCounter = await db.collection('counters').findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection('counters').insertOne({_id:'cartItemId', value:0});
    }
}

const createIndexes = async (db)=>{
    try{
        await db.collection('products').createIndex({price:1});
        await db.collection('products').createIndex({name:1, category:-1});
        await db.collection('products').createIndex({desc:'text'});
    }catch(err){
        console.log(err);
    }
    console.log("Indexes are created")
}

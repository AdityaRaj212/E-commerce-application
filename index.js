import './env.js';

import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import cors from 'cors';

import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert {type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import applicationError from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';
import UserController from './src/features/user/user.controller.js';
import OrderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from './src/config/mongoose.js';
import LikeRouter from './src/features/like/like.router.js';

const server = express();

// CORS policy configuration
const corsOptions = {
    origin: 'http://localhost:5500',
    allowedHeaders: '*'
}

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(loggerMiddleware);

// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');

//     // return ok for pre-flight request
//     if(req.method=="OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })


server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

server.get('/',(req,res)=>{
    res.send('Welcome to E-commerce application');
});

// for all requests related to product, redirect to product routes.
// localhost::3200/api/products
server.use('/api/products', jwtAuth, ProductRouter);
server.use('/api/users', UserRouter);
server.use('/api/cartItems',jwtAuth,cartRouter);
server.use('/api/orders',jwtAuth,OrderRouter);
server.use('/api/likes',jwtAuth,LikeRouter);

// Application level error handler
server.use((err,req,res,next)=>{
    if(err instanceof applicationError){
        res.status(err.code).send(err.message); // this error needs not to be logged.
    }
    console.log(err);
    res.status(500).send("Something went wrong! Please try again later"); // this error should be logged.
})

// error 404 handler
server.use((req,res)=>{
    res.send('API not found!');
})

server.listen(3200,()=>{
    console.log('Server is up and running at 3200');
    // connectToMongoDB();
    connectUsingMongoose();
})
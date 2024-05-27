import applicationError from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req,res){
        try{
            const products = await this.productRepository.getAll();
            res.send(products);
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async addProduct(req,res){
        try{
            const {name,desc,category,price,sizes} = req.body;
            console.log(req.body);
            const newProduct = {
                name,
                desc,
                imageURL : null, //replace 'req.file.filename' by null
                category,
                price: parseFloat(price),
                sizes : sizes
            }
            const newList = await this.productRepository.addProduct(newProduct);
            res.status(201).send(newList);
            console.log(newList);
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async getOneProduct(req,res){
        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if(product){
                res.status(200).send(product);
            }
            else{
                res.status(404).send("Error: Product not found");
            }
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    // localhost:3200/api/products/filter?minPrice=10&maxPrice=4000&category=Shirt
    async filterProduct(req,res){
        try{
            console.log(req.query);
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const result = await this.productRepository.filter(minPrice,maxPrice,category);
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async rateProduct(req,res){
        try{
            const userId = req.userId;
            const productId = req.body.productId;
            const rating = req.body.rating;
            await this.productRepository.rateProduct(userId,productId,rating);  
            res.status(200).send('Rating has been added'); 
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }
    
    async averagePrice(req,res,next){
        try{
            const result = await this.productRepository.averageProductPricePerCategory();
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }

    async highestNoOfRatings(req,res,next){
        try{
            const result = await this.productRepository.highestNoOfReviews();
            res.status(200).send(result);   
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong!',500);
        }
    }
}
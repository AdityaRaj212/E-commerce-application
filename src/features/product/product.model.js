import UserModel from "../user/user.model.js";
import applicationError from "../../error-handler/applicationError.js";

export default class ProductModel{
    constructor(id,name,desc,imageURL,category,price,sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.imageURL = imageURL;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }

    // static getAll(){
    //     return products;
    // }

    // static addProduct(product){
    //     const id = products.length+1;
    //     product.id = id;
    //     products.push(product);
    //     return products;
    // }

    // static get(id){
    //     const product = products.find((p)=>p.id==id);
    //     return product;
    // }

    // static filter(minPrice,maxPrice,category){
    //     const result = products.filter((product)=>{
    //         return (
    //             (!minPrice || product.price>=minPrice)
    //             && (!maxPrice || product.price<=maxPrice)
    //             && (!category || product.category===category)
    //     )
    //     });
    //     return result;
    // }

    // static rateProduct(userId, productId, rating){
    //     const user = UserModel.getAll().find(u=>u.id==userId);
        
    //     // check if user exists or not
    //     if(!user){
    //         throw new applicationError("User not found!",404);
    //     }
        
    //     const product = products.find(p=>p.id==productId);

    //     // check if product exists or not
    //     if(!product){
    //         throw new applicationError("Product not found!",400);
    //     }

    //     if(!product.ratings){
    //         product.ratings = [];
    //         product.ratings.push({userId,rating});
    //     }else{
    //         const lastRatingIndex = product.ratings.findIndex(r=>r.userId==userId);
    //         if(lastRatingIndex>=0){
    //             product.ratings[lastRatingIndex] = {userId,rating};
    //         }else{
    //             product.ratings.push({userId,rating});
    //         }
    //     }
    // }
}

let products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for product 1',
        'https://m.media-amazon.com/images/I/41W7U1ZQhDL._SX300_SY300_QL70_FMwebp_.jpg',
        'Smart Watch',
        1999,
    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for product 2',
        'https://m.media-amazon.com/images/I/71iO2R+CLjL._AC_SL1500_.jpg',
        'Laptop',
        49999,
    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for product 3',
        'https://m.media-amazon.com/images/I/81Rtt8B6fzL._AC_SL1500_.jpg',
        'Shirt',
        2999,
        ['M','L','XL'],
    )
];
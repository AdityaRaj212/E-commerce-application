import CartItemsModel from "./cartItems.model.js";
import cartItemsRepository from "./cartItems.repository.js";

export default class CartItemController{
    constructor(){
        this.cartItemsRepository = new cartItemsRepository();
    }

    async add(req,res){
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const userId = req.userId;
        const new_item = await this.cartItemsRepository.add(userId,productId,quantity);
        res.status(201).send(new_item);
    }

    async get(req,res){
        const userId = req.userId;
        const cartItem = await this.cartItemsRepository.get(userId);
        res.status(200).send(cartItem);
    }

    async delete(req,res){
        const userId = req.userId;
        const cartItemId = req.params.id;
        await this.cartItemsRepository.delete(userId,cartItemId);
        res.status(200).send('Cart item is removed');
    }
}
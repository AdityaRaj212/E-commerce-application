export default class CartItemsModel{
    constructor(userId,productId,quantity){
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        // this._id = id;
    }

    // static add(userId,productId,quantity){
    //     let new_item = new CartItemsModel(userId,productId,quantity,cartItems.length+1);
    //     new_item.id = cartItems.length+1;
    //     cartItems.push(new_item);
    //     return new_item;
    // }

    // static get(userId){
    //     const cartItem = cartItems.filter(c=>c.userId==userId);
    //     return cartItem;
    // }

    static delete(userId,cartItemId){
        const index = cartItems.findIndex((c)=>c.id==cartItemId && c.userId==userId);
        if(index==-1){
            return 'Item not found';
        }
        cartItems.splice(index,1);

    }
}

const cartItems = [
    new CartItemsModel(1,2,1,1),
    new CartItemsModel(2,1,2,2),
    new CartItemsModel(2,4,4,3),
]
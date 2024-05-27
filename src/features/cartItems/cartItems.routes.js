import express from 'express';
import CartItemController from './cartItems.controller.js';

const router = express.Router();

const cartItemController = new CartItemController();

router.post('/',(req,res)=>{
    cartItemController.add(req,res)
});
router.get('/',(req,res)=>{
    cartItemController.get(req,res)
});
router.delete('/:id',(req,res)=>{
    cartItemController.delete(req,res)
});

export default router;
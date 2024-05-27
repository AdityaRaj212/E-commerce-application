import express from 'express';
import LikeController from './like.controller.js';

const router = express.Router();

const likeController = new LikeController();

router.post('/',(req,res)=>{
    likeController.likeItem(req,res);
});

router.get('/',(req,res)=>{
    likeController.getLikes(req,res);
});

export default router;
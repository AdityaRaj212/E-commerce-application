import LikeRepository from "./like.repository.js";
import applicationError from "../../error-handler/applicationError.js";

export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req,res){
        try{
            const {id,type} = req.query;
            const likes = await this.likeRepository.getLikes(id,type);
            return res.status(200).send(likes);
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong',500);
        }
    }

    async likeItem(req,res){
        try{
            const {id,type} = req.body;
            const userId = req.userId;
            if(type!='product' && type!='category'){
                res.status(400).send('Invalid Type');
            }
            if(type=='product'){
                this.likeRepository.likeProduct(userId,id);
            }else{
                this.likeRepository.likeCategory(userId,id);
            }
            res.status(200).send();
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong',500);
        }
    }
}
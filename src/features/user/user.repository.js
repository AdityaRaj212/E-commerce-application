import mongoose from "mongoose";
import { UserSchema } from "./user.schema.js";
import applicationError from "../../error-handler/applicationError.js";

const UserModel = mongoose.model('user',UserSchema);

export default class UserRepository{
    async signUp(user){
        try{
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }catch(err){
            console.log(err);
            throw new applicationError("Something went wrong",500);
        }
    }

    async signIn(email,password){
        try{
            return await UserModel.findOne({email,password});
        }catch(err){
            console.log(err);
            throw new applicationError("Something went wrong",500);
        }
    }

    async findByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            throw new applicationError('Something went wrong',500);
        }
    }

    async resetPassword(userId,password){
        try{
            let user = await UserModel.findById(userId);
            if(user){
                user.password = password;
                user.save();
            }else{
                throw new Error("User not found");
            }
        }catch(err){
            console.log(err);
            throw new applicationError('Something went wrong',500);
        }
    }
}
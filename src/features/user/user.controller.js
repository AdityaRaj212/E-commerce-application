import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req,res){
        const{name,email,password,type} = req.body;

        const hashedPassword = await bcrypt.hash(password,12); 
        // the second argument in hash is salt
        // this number should be between 10 to 20
        // higher the number the more difficult it is to break the hash
        // but higher salt also leads to higher computation cost

        const user = new UserModel(name,email,hashedPassword,type);
        await this.userRepository.signUp(user);
        res.status(201).send(user);
    }

    async signIn(req,res){
        try{
            const {email,password} = req.body;
            const user = await this.userRepository.findByEmail(email);
    
            if(!user){
                res.status(400).send('Incorrect credentials');
            }else{
                const result = await bcrypt.compare(password,user.password);
                if(result){
                    // 1. Create jwt token
                    const token = jwt.sign({userId: user._id, email: user.email},process.env.JWT_SECRET,{expiresIn:'12h'});
    
    
                    // 2. Send token
                    res.status(200).send(token);
                }else{
                    res.status(400).send('Incorrect credentials');
                }
            }
        }catch(err){
            console.log(err);
            return res.status(400).send('Something went wrong.');
        }
    } 
    
    async resetPassword(req,res){
        try{
            const {password} = req.body;
            const userId = req.userId;
            const hashedPassword = await bcrypt.hash(password,12); 
            await this.userRepository.resetPassword(userId,hashedPassword);
            res.status(200).send('Password changed');
        }catch(err){
            console.log(err);
            res.status(500).send('Something went wrong');
        }
    }

    testing(req,res){
        res.send('yo');
    }
}
import express from 'express'; 
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const userController = new UserController();

router.post('/signup', (req,res)=>{
    userController.signUp(req,res)
});
router.post('/signin', (req,res)=>{
    userController.signIn(req,res);
});
router.get('/',userController.testing);
router.put('/reset-password', jwtAuth,(req,res)=>{
    userController.resetPassword(req,res);
})

export default router;
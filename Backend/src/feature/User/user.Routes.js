import express from 'express';
import userController from './user.Controller.js'

const userRouter = express.Router();

const UserController = new userController();

userRouter.post('/signup' , (req , res) =>{
    UserController.signUp(req, res);
})
userRouter.post('/signin', (req , res) =>{
    UserController.signIn(req , res);
})

userRouter.post('/otp' ,  (req , res) =>{
    UserController.getOtp(req , res);
});

userRouter.post('/verify-otp', (req , res) =>{
    UserController.verifyOtp(req, res);
});
userRouter.post('/reset-password', (req , res) =>{
    UserController.newPassword(req, res)
});

export default userRouter;
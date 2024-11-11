import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validate, validateRequest } from '../utils/validator.js';
import verifyToken from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.route('/register')
    .post([validate('register'), validateRequest], userController.registerUser);
userRouter.route('/login')
    .post([validate('login'), validateRequest], userController.loginUser);
userRouter.route('/logout')
    .post(verifyToken, userController.logoutUser);
userRouter.route('/')
    .get(verifyToken, userController.getOtherUsers);

    
export default userRouter;
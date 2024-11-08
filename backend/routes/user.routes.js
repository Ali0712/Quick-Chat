import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validate, validateRequest } from '../utils/validator.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/register', validate('signup'), validateRequest, userController.registerUser);

export default userRouter;
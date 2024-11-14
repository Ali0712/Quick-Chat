import express from 'express';
import MessageController from '../controllers/message.controller.js';
import { validate, validateRequest } from '../utils/validator.js';
import verifyToken from '../middlewares/auth.middleware.js';

const messageRouter = express.Router();

const messageController = new MessageController();

messageRouter.route("/send/:id")
    .post([verifyToken, validate('message'), validateRequest], messageController.sendMessage);
messageRouter.route("/:id")
    .get(verifyToken, messageController.getMessage);

    
export default messageRouter;
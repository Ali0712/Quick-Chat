import httpResponse from "../utils/httpResponse.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

class MessageController {
    async getOtherUsers(req, res) {
        try {
            const loggedInUserId = req.user._id;
            const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
            if (!users) {
                return httpResponse.notFoundResponse(res, "Users not found");
            }
            return httpResponse.successResponse(res, users, "Users fetched successfully");
        } catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }

    async sendMessage(req, res) {
        try {
            const senderId = req.user._id;      // my id
            const receiverId = req.params.id;   // user to chat with
            const { text, image } = req.body;

            let imageUrl;
            if (image) {
                const uploadedImage = await cloudinary.uploader.upload(image);
                imageUrl = uploadedImage.secure_url;
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                text,
                image: imageUrl,
            });
            
            if (!newMessage) {
                return httpResponse.badRequestResponse(res, "Something went wrong while sending message");
            }
            await newMessage.save();

            // socket io part


            return httpResponse.successResponse(res, newMessage, "Message sent successfully", 201);
        }
        catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }

    async getMessages(req, res) {
        try {
            const senderId = req.user._id;     // my id
            const receiverId = req.params.id;  // user to chat with

            const messages = await Message.find({
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId }
                ]
            });
            if (!messages) {
                return httpResponse.notFoundResponse(res, "No messages found");
            }
            return httpResponse.successResponse(res, messages, "Messages retrieved successfully");

        }
        catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }
}

export default MessageController;
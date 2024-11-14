import httpResponse from "../utils/httpResponse.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

class MessageController{
    async sendMessage(req, res){
        try {
            const senderId = req.user._id;
            const receiverId = req.params.id;
            const { message } = req.body;

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                });
                if (!conversation) {
                    return httpResponse.badRequestResponse(res, "Something went wrong while creating conversation");
                }
            }
            const newMessage = await Message.create({
                sender: senderId,
                receiver: receiverId,
                message
            });
            if (!newMessage) {
                return httpResponse.badRequestResponse(res, "Something went wrong while sending message");
            }
            if (newMessage){
                conversation.messages.push(newMessage._id);
            }
            await Promise.all([conversation.save(), newMessage.save()]);


            // socket io part

            return httpResponse.successResponse(res, newMessage, "Message sent successfully", 201);
        }
        catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }

    async getMessage(req, res){
        try{
            const senderId = req.user._id;
            const receiverId = req.params.id;
            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            }).populate("messages");
            if (!conversation) {
                return httpResponse.notFoundResponse(res, "No conversation found");
            }
            return httpResponse.successResponse(res, conversation.messages, "Messages retrieved successfully");

        }
        catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }
}

export default MessageController;
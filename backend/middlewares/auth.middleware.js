import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import httpResponse from "../utils/httpResponse.js";


const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token || req.headers("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return httpResponse.unauthorizedResponse(res, "Unauthorized");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return httpResponse.notFoundResponse(res, "Invalid token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        return httpResponse.unauthorizedResponse(res, "Session expired");
    }
}

export default verifyToken;
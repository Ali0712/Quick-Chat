import User from '../models/user.model.js';
import httpResponse from '../utils/httpResponse.js';

class UserController {

    async registerUser(req, res) {
        const { email, password, confirmPassword, fullName, gender } = req.body;
        try {
            if (password !== confirmPassword) {
                httpResponse.badRequestResponse(res, "Passwords do not match");
            }

            const existedUser = await User.findOne({ email });
            if (existedUser) {
                httpResponse.conflictResponse(res, "User already exists");
            }

            const male = `https://avatar.iran.liara.run/public/boy?username=${fullName}`
            const female = `https://avatar.iran.liara.run/public/girl?username=${fullName}`

            const user = await User.create({
                email,
                password,
                fullName,
                gender,
                profilePhoto: gender === "male" ? male : female
            });

            const createdUser = await User.findbyId(user._id).select("-password");
            if (!createdUser) {
                httpResponse.badRequestResponse(res, "Something went wrong while creating user");
            }
            
            httpResponse.successResponse(res, createdUser, 201);

        } catch (error) {
            httpResponse.errorResponse(res, error.message);
        }
    }
}
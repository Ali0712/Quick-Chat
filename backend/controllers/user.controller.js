import { User } from '../models/user.model.js';
import httpResponse from '../utils/httpResponse.js';

class UserController {

    async registerUser(req, res) {
        const { email, password, confirmPassword, fullName, gender } = req.body;
        try {
            if (password !== confirmPassword) {
                return httpResponse.badRequestResponse(res, "Passwords do not match");
            }

            const existedUser = await User.findOne({ email });
            if (existedUser) {
                return httpResponse.conflictResponse(res, "User already exists");
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

            const createdUser = await User.findById(user._id).select("-password");
            if (!createdUser) {
                return httpResponse.badRequestResponse(res, "Something went wrong while creating user");
            }

            return httpResponse.successResponse(res, createdUser, "User created successfully", 201);

        } catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return httpResponse.notFoundResponse(res, "User not found");
            }
            const comparePassword = await user.comparePassword(password);
            if (!comparePassword) {
                return httpResponse.badRequestResponse(res, "Invalid credentials");
            }
            const loggedInUser = await User.findById(user._id).select("-password");
        
            const token = user.generateToken();
            return httpResponse.loginResponse(res, token, loggedInUser, "User logged in successfully");
        }
        catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }
    
    
}

export default UserController;
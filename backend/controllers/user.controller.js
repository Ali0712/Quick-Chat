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
            const data = {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
            }
        
            const token = user.generateToken();
            return httpResponse.loginResponse(res, token, data, "User logged in successfully");
        }
        catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }

    async logoutUser(req, res) {
        try {
            return httpResponse.logoutResponse(res, "User logged out successfully");
        } catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }
    
    async getOtherUsers(req, res) {
        try {
            const userId = req.user._id;
            const users = await User.find({ _id: { $ne: userId } }).select("-password");
            if (!users) {
                return httpResponse.notFoundResponse(res, "Users not found");
            }
            return httpResponse.successResponse(res, users, "Users fetched successfully");
        } catch (error) {
            return httpResponse.errorResponse(res, error.message);
        }
    }

}

export default UserController;
import User from '../models/user.model.js';

class UserController {
  
    async registerUser(req, res){
        const { email, password, confirmPassword, fullName, gender } = req.body;
        try {
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }

            const existedUser = await User.findOne({ email });
            if (existedUser) {
                return res.status(409).json({ message: "User already exists" });
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

            return res.status(201).json({
                message: "User registered successfully",
                success: true,
                data: user
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
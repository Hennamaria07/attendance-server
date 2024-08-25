import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 86400000),
};

export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        console.log(name, email, password);
        
        // Validate the input fields
        if([email, password, name].some(field => !field || field.lenght === 0)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        
        // Check if the user is already exists
        const userExists = await UserModel.findOne({email});
        if(userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({
                name,
                email,
                password: hashedPassword
            })
            const token = generateToken(user._id);
            const userWithoutPassword = await UserModel.findById(user._id).select('-password');
            return res.status(201)
            .cookie('token', token, cookieOptions)
            .json({
                success: true,
                message: "User created successfully.",
                token,
                user: userWithoutPassword,
                isAuthenticated: true
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // Validate the input fields
        if([email, password].some(field => !field || field.lenght === 0)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        
        // Check if the user exists
        const user = await UserModel.findOne({email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }
        const userWithoutPassword = await UserModel.findOne({email}).select('-password');
        // Generate the token
        const token = generateToken(user._id);
        
        return res.status(200)
        .cookie('token', token, cookieOptions)
        .json({
            success: true,
            message: "Logged in successfully.",
            token,
            user: userWithoutPassword,
            isAuthenticated: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()), 
        })
        return res.status(200).json({
            success: true,
            isAuthenticated: false,
            message: "User successfully logged out"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
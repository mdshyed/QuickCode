import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const tokens = 10000; //Initial free tokens given to the user

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture} = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email, picture, tokens});
        }

        const jwtToken = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(201)
            .cookie('token', jwtToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: 'None'
            })
            .json({
                message: "User Login successfully",
                success: true,
                user,
            });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Login failed" });
    }
};

export const Logout = async (req, res) => {
    return res.status(200)
    .cookie('token','',{
        expiresIn: new Date(Date.now()),
        httpOnly:true,
        secure: true,
        sameSite: 'None'
    })
    .json({
        message: `You logged out successfully`,
        success: true,
    })
}

export const getUser =  async(req, res) =>{
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        return res.status(200).json({
            message:"user found",
            success:true,
            user
        })
    } catch (error) {
        console.log("Get user from token failed: ", error);
    }
}

export const updateTokens =  async(req, res) =>{
    try {
        const {tokens} = req.body
        const userId = req.userId;
        const user  = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        await User.findByIdAndUpdate(userId, {$set: {tokens}});

        return res.status(200).json({
            message: "Token updated",
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Token update failed",
            success: false
        })
    }
}
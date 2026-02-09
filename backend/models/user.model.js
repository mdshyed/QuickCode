import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    picture: String,
    tokens: Number
}, {Timestamp: true});

export const User = mongoose.model('User', userSchema);
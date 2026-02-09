import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    messages: [
        {
            type: mongoose.Schema.Types.Mixed, // Allows any JSON object
        }
    ],
    fileData: {
        type: mongoose.Schema.Types.Mixed, // Allows a JSON object
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Workspace = mongoose.model('Workspace', workspaceSchema);
import { User } from "../models/user.model.js";
import { Workspace } from "../models/workspace.model.js";

export const createWorkspace = async (req, res) => {
    try {
        const {message} = req.body
        const userId = req.userId
        if(!message) {
            return res.status(400).json({
                message: "Message is required",
                success: false
            })
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        const workspace =  await Workspace.create({messages: message ,user:userId});
        return res.status(200).json({
            message: "Workspace created",
            success: true,
            workspace
        })
    } catch (error) {
        return res.status(500).json({
            message: "Workspace creation failed",
            success: false
        })
    }
}
export const updateMessages = async (req, res) => {
    try {
        const {message} = req.body;
        const {id} = req.params;

        const workspace = await Workspace.findById(id);
        if(!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
                success: false
            })
        }
        const updatedWorkspace = await Workspace.findByIdAndUpdate(id, {$push: {messages: message}});
        return res.status(200).json({
            message: "Workspace updated",
            success: true,
            workspace: updatedWorkspace
        })
    } catch (error) {
        return res.status(500).json({
            message: "Workspace update failed",
            success: false
        })
    }
}

export const getWorkspace = async (req, res) => {
    try {
        const {id} = req.params;
        const workspace = await Workspace.findById(id);

        if(!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Workspaces found",
            success: true,
            workspace
        })
    } catch (error) {
        return res.status(500).json({
            message: "Workspace fetch failed",
            success: false
        })
    }
}

export const updateFileDta = async (req, res) => {
    try {
        const {id} = req.params;
        const {fileData} = req.body;
        const workspace = await Workspace.findById(id);
        if(!fileData){
            return res.status(400).json({
                message: "File data is required",
                success: false
            })
        }

        if(!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
                success: false
            })
        }
        const updatedWorkspace = await Workspace.findByIdAndUpdate(id, {$set: {fileData}});
        return res.status(200).json({
            message: "File data updated",
            success: true,
            workspace: updatedWorkspace
        })
    } catch (error) {
        return res.status(500).json({
            message: "File data update failed",
            success: false
        })
    }
}

export const getUserWorkspaces = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        const workspaces = await Workspace.find({user: userId});
        return res.status(200).json({
            message: "Workspaces found",
            success: true,
            workspaces
        })
    } catch (error) {
        return res.status(500).json({
            message: "get User Workspaces failed",
            success: false
        })
    }
}

export const deleteWorkspace = async (req, res) => {
    try {
        const {id} = req.body;
        const workspace = await Workspace.findById(id);
        if(!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
                success: false
            })
        }
        await Workspace.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Chat deleted successfully.",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Workspace delete failed",
            success: false
        })    
    }
}
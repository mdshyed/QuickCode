import { Router } from "express";
import { createWorkspace, deleteWorkspace, getUserWorkspaces, getWorkspace, updateFileDta, updateMessages } from "../controllers/workspace.controller.js";
import { isAuthenticated } from "../db/auth.js";

const router = Router();

router.route("/create").post(isAuthenticated, createWorkspace);
router.route("/get/:id").get(isAuthenticated, getWorkspace);
router.route("/update/filedata/:id").post(isAuthenticated, updateFileDta);
router.route("/update/messages/:id").post(isAuthenticated, updateMessages);
router.route("/all").get(isAuthenticated, getUserWorkspaces);
router.route("/delete").post(isAuthenticated, deleteWorkspace);

export default router;
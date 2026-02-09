import { Router } from "express";
import { aiChatGen, aiCodeGen, aiPromptEnhance } from "../controllers/ai.controller.js";

const router = Router();

router.route("/chat").post(aiChatGen);
router.route("/code").post(aiCodeGen);
router.route("/enhance").post(aiPromptEnhance);

export default router;
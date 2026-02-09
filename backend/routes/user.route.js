import { Router } from "express";
import { getUser, googleLogin, Logout, updateTokens } from "../controllers/user.controller.js";
import { isAuthenticated } from "../db/auth.js";

const router = Router();

router.route("/login").post(googleLogin);
router.route("/getuser").get(isAuthenticated, getUser);
router.route("/logout").post(isAuthenticated, Logout);
router.route("/update/tokens").post(isAuthenticated, updateTokens);

export default router;
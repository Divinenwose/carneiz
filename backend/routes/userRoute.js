import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);



export default router;

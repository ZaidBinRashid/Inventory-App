import express from "express";
import { signUp } from "../controllers/userController.js";
import { validateSignUp } from "../middleware/userValidation.js";

const router = express.Router();

router.post("/signup", validateSignUp, signUp);

export default router;

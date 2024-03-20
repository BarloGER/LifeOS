import { Router } from "express";
import { validateJoi } from "../middlewares/validateJoi.js";
import { userSchema } from "../joi/userSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/signup", validateJoi(userSchema), signUp);
authRouter.post("/signin", signIn);

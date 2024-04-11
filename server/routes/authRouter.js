import { Router } from "express";
import { validateJoi } from "../middlewares/validateJoi.js";
import { signUpSchema, signInSchema } from "../joi/authSchemas.js";
import { signUp, signIn } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/signup", validateJoi(signUpSchema), signUp);
authRouter.post("/signin", validateJoi(signInSchema), signIn);

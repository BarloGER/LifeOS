import { Router } from "express";
import { signUp, signIn } from "../controllers/userController.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

export const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

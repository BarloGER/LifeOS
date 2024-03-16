import { Router } from "express";
import { validateJoi } from "../middlewares/validateJoi.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { userSchema } from "../joi/userSchema.js";
import {
  signUp,
  signIn,
  getUser,
  editUser,
  deleteUser,
} from "../controllers/userController.js";

export const authRouter = Router();

authRouter.post("/signup", validateJoi(userSchema), signUp);
authRouter.post("/signin", signIn);

authRouter.get("/me", verifyToken, getUser);
authRouter.put("/me", verifyToken, editUser);
authRouter.delete("/me", verifyToken, deleteUser);

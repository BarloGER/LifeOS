import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  signUp,
  signIn,
  getUser,
  editUser,
  deleteUser,
} from "../controllers/userController.js";

export const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

authRouter.get("/me", verifyToken, getUser);
authRouter.put("/me", verifyToken, editUser);
authRouter.delete("/me", verifyToken, deleteUser);

import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getUser,
  editUser,
  deleteUser,
  getUserByUsername,
} from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/me", verifyToken, getUser);
userRouter.put("/me", verifyToken, editUser);
userRouter.delete("/me", verifyToken, deleteUser);

userRouter.get("/users", verifyToken, getUserByUsername);

import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateJoi } from "../middlewares/validateJoi.js";
import { deleteUserTransaction } from "../middlewares/deleteUserTransaction.js";
import { userSchema } from "../joi/userSchema.js";
import {
  getUser,
  editUser,
  deleteUser,
  getUserByUsername,
} from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/me", verifyToken, getUser);
userRouter.put("/me", verifyToken, validateJoi(userSchema), editUser);
userRouter.delete("/me", verifyToken, deleteUserTransaction, deleteUser);

userRouter.get("/users", verifyToken, getUserByUsername);

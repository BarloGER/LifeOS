import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateJoi } from "../middlewares/validateJoi.js";
import { deleteUserTransaction } from "../middlewares/deleteUserTransaction.js";
import {
  getUserSchema,
  editUserSchema,
  deleteUserSchema,
} from "../joi/userSchemas.js";
import {
  getUser,
  editUser,
  deleteUser,
} from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/me", verifyToken, validateJoi(getUserSchema), getUser);
userRouter.put("/me", verifyToken, validateJoi(editUserSchema), editUser);
userRouter.delete(
  "/me",
  verifyToken,
  validateJoi(deleteUserSchema),
  deleteUserTransaction,
  deleteUser,
);

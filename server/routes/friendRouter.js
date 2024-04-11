import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateJoi } from "../middlewares/validateJoi.js";
import {
  getFriendByUsernameSchema,
  sendFriendRequestSchema,
  acceptFriendRequestSchema,
  rejectFriendRequestSchema,
  deleteFriendSchema,
} from "../joi/friendSchemas.js";
import { removeFriendTransaction } from "../middlewares/removeFriendTransaction.js";
import {
  getFriendByUsername,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
} from "../controllers/friendController.js";

export const friendRouter = Router();

friendRouter.post(
  "/friend",
  verifyToken,
  validateJoi(getFriendByUsernameSchema),
  getFriendByUsername,
);
friendRouter.delete(
  "/friend",
  verifyToken,
  validateJoi(deleteFriendSchema),
  removeFriendTransaction,
  deleteFriend,
);

friendRouter.post(
  "/friend/send-request",
  verifyToken,
  validateJoi(sendFriendRequestSchema),
  sendFriendRequest,
);
friendRouter.post(
  "/friend/accept-request",
  verifyToken,
  validateJoi(acceptFriendRequestSchema),
  acceptFriendRequest,
);
friendRouter.post(
  "/friend/reject-request",
  verifyToken,
  validateJoi(rejectFriendRequestSchema),
  rejectFriendRequest,
);

import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { removeFriendTransaction } from "../middlewares/removeFriendTransaction.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
} from "../controllers/friendController.js";

export const friendRouter = Router();

friendRouter.post("/friend", verifyToken, sendFriendRequest);
friendRouter.delete(
  "/friend",
  verifyToken,
  removeFriendTransaction,
  deleteFriend,
);

friendRouter.post("/friend/accept-request", verifyToken, acceptFriendRequest);
friendRouter.post("/friend/reject-request", verifyToken, rejectFriendRequest);

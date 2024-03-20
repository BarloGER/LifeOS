import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { removeFriendFromAllFeatures } from "../middlewares/removeFriendFromAllFeatures.js";
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
  removeFriendFromAllFeatures,
  deleteFriend,
);

friendRouter.post("/friend/accept-request", verifyToken, acceptFriendRequest);
friendRouter.post("/friend/reject-request", verifyToken, rejectFriendRequest);

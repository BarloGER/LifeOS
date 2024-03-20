// middlewares/removeFriendMiddleware.js
import mongoose from "mongoose";
import ShoppingList from "../models/ShoppingList.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const removeFriendFromAllFeatures = asyncHandler(
  async (req, res, next) => {
    const { userID } = req;
    const { friendID } = req.body;

    // Starts a transaction to make sure the friend is only deleted, if all DB calls are successful
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await ShoppingList.updateMany(
        { ownerID: userID },
        { $pull: { sharedWith: { friendID } } },
        { session },
      );

      // Add more feature here

      await session.commitTransaction();
      next();
    } catch (error) {
      await session.abortTransaction();
      next(
        new ErrorResponse({
          message: "Fehler beim Entfernen des Freundes aus den Features.",
          statusCode: 500,
          errorType: "ServerError",
          errorCode: "SYS_DATABASE_003",
        }),
      );
    } finally {
      session.endSession();
    }
  },
);

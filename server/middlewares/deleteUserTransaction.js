import mongoose from "mongoose";
import User from "../models/User.js";
import ShoppingList from "../models/ShoppingList.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const deleteUserTransaction = asyncHandler(async (req, res, next) => {
  const { userID } = req;

  // Starts a transaction to make sure the user is only deleted, if all DB calls are successful
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Delete friend connections
    const user = await User.findById(userID).session(session);
    if (!user) {
      throw new Error("Benutzer nicht gefunden.");
    }

    for (const friend of user.friends) {
      await User.updateOne(
        { _id: friend.friendID },
        { $pull: { friends: { friendID: userID } } },
        { session },
      );
    }

    // Delete every owned shopping list and remove user from shared lists
    await ShoppingList.deleteMany({ ownerID: userID }, { session });
    await ShoppingList.updateMany(
      { sharedWith: { $elemMatch: { friendID: userID } } },
      { $pull: { sharedWith: { friendID: userID } } },
      { session },
    );

    // Add more feature here

    await session.commitTransaction();
    next();
  } catch (error) {
    await session.abortTransaction();
    next(
      new ErrorResponse({
        message: "Fehler beim Entfernen des Benutzers aus den Features.",
        statusCode: 500,
        errorType: "ServerError",
        errorCode: "SYS_DATABASE_003",
      }),
    );
  } finally {
    session.endSession();
  }
});

import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import User from "../models/User.js";

// ToDO: Mehrere Freunde löschen

export const sendFriendRequest = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { username, friendID, friendUsername } = req.body;

  const user = await User.findById(userID);
  if (!user) {
    throw new ErrorResponse({
      message: "Benutzer existiert nicht.",
      statusCode: 404,
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_002",
    });
  }

  // Check if users are already friends
  const isAlreadyFriend = user.friends.some(
    (friend) => friend.friendID === friendID,
  );
  if (isAlreadyFriend) {
    throw new ErrorResponse({
      message: `Du und ${friendUsername} seid bereits befreundet.`,
      statusCode: 409,
      errorType: "ConflictError",
      errorCode: "FRIEND_CONFLICT_001",
    });
  }

  // Get friend
  const friend = await User.findById(friendID);
  if (!friend) {
    throw new ErrorResponse({
      message: `${friendUsername} existiert nicht.`,
      statusCode: 404,
      errorType: "NotFoundError",
      errorCode: "FRIEND_NOTFOUND_002",
    });
  }

  // Check if there is already a friend request
  const pendingRequest = friend.friendRequestFrom.some(
    (request) => request.friendID === userID,
  );
  if (pendingRequest) {
    throw new ErrorResponse({
      message: `Du hast ${friendUsername} bereits eine Freundesanfrage gesendet.`,
      statusCode: 409,
      errorType: "ConflictError",
      errorCode: "FRIEND_CONFLICT_002",
    });
  }

  // Add request to friend
  const addRequestToFriend = await friend.updateOne({
    $addToSet: {
      friendRequestFrom: {
        friendID: userID,
        friendUsername: username,
      },
    },
  });
  if (!addRequestToFriend) {
    throw new ErrorResponse({
      message:
        "Unbekannter Datenbank Fehler. Später erneut versuchen, oder Support kontaktieren",
      statusCode: 500,
      errorType: "ServerError",
      errorCode: "SYS_DATABASE_002",
    });
  }

  res.status(200).json({
    message: "Freundschaftsanfrage gesendet.",
  });
});

export const acceptFriendRequest = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { username, friendID, friendUsername } = req.body;

  // Get user
  const user = await User.findById(userID);
  if (!user) {
    throw new ErrorResponse({
      message: "Benutzer existiert nicht.",
      statusCode: 404,
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_002",
    });
  }

  // Check if useres are already friends
  const isAlreadyFriend = user.friends.some(
    (friend) => friend.friendID === friendID,
  );
  if (isAlreadyFriend) {
    throw new ErrorResponse({
      message: `Du und ${friendUsername} seid bereits befreundet.`,
      statusCode: 409,
      errorType: "ConflictError",
      errorCode: "FRIEND_CONFLICT_001",
    });
  }

  // Check if there is an active request
  const pendingRequest = user.friendRequestFrom.some(
    (request) => request.friendID === friendID,
  );
  if (!pendingRequest) {
    throw new ErrorResponse({
      message: `Du hast keine Freundschaftsanfrage von ${friendUsername}.`,
      statusCode: 404,
      errorType: "NotFoundError",
      errorCode: "FRIEND_NOTFOUND_003",
    });
  }

  // Remove friendRequest and add friend to friends arr
  const updateUser = await user.updateOne(
    {
      $pull: { friendRequestFrom: { friendID: friendID } },
      $addToSet: {
        friends: { friendID: friendID, friendUsername: friendUsername },
      },
    },
    { new: true },
  );

  // Add user to friend who sended the request
  const updateFriend = await User.findByIdAndUpdate(
    friendID,
    {
      $addToSet: { friends: { friendID: userID, friendUsername: username } },
    },
    { new: true },
  );

  if (!updateUser || !updateFriend) {
    throw new ErrorResponse({
      message:
        "Unbekannter Datenbank Fehler. Später erneut versuchen, oder Support kontaktieren",
      statusCode: 500,
      errorType: "ServerError",
      errorCode: "SYS_DATABASE_002",
    });
  }

  res.status(200).json({
    message: "Freundschaftsanfrage akzeptiert.",
  });
});

export const rejectFriendRequest = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { friendID, friendUsername } = req.body;

  // Get user
  const user = await User.findById(userID);
  if (!user) {
    throw new ErrorResponse({
      message: "Benutzer existiert nicht.",
      statusCode: 404,
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_002",
    });
  }

  // Check if users are already friends
  const isAlreadyFriend = user.friends.some(
    (friend) => friend.friendID === friendID,
  );
  if (isAlreadyFriend) {
    throw new ErrorResponse({
      message: `Du und ${friendUsername} seid bereits befreundet.`,
      statusCode: 409,
      errorType: "ConflictError",
      errorCode: "FRIEND_CONFLICT_001",
    });
  }

  // Check if there is an pending request
  const pendingRequest = user.friendRequestFrom.some(
    (request) => request.friendID === friendID,
  );
  if (!pendingRequest) {
    throw new ErrorResponse({
      message: `Du hast keine Freundschaftsanfrage von ${friendUsername}.`,
      statusCode: 404,
      errorType: "NotFoundError",
      errorCode: "FRIEND_NOTFOUND_003",
    });
  }

  // Remove the friend request
  const removeRequest = await User.findByIdAndUpdate(userID, {
    $pull: { friendRequestFrom: { friendID: friendID } },
  });
  if (!removeRequest) {
    throw new ErrorResponse({
      message:
        "Unbekannter Datenbank Fehler. Später erneut versuchen, oder Support kontaktieren",
      statusCode: 500,
      errorType: "ServerError",
      errorCode: "SYS_DATABASE_002",
    });
  }

  res.status(200).json({
    message: "Freundschaftsanfrage abgelehnt.",
  });
});

export const deleteFriend = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { friendID, friendUsername } = req.body;

  // Get user
  const user = await User.findById(userID);
  if (!user) {
    throw new ErrorResponse({
      message: "Benutzer existiert nicht.",
      statusCode: 404,
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_002",
    });
  }

  // Check if users are friends
  const isFriend = user.friends.some((friend) => friend.friendID === friendID);
  if (!isFriend) {
    throw new ErrorResponse({
      message: `Du und ${friendUsername} seid keine Freunde.`,
      statusCode: 409,
      errorType: "ConflictError",
      errorCode: "FRIEND_CONFLICT_003",
    });
  }

  // Remove friend from user
  const updateUser = await user.updateOne(
    {
      $pull: { friends: { friendID: friendID } },
    },
    { new: true },
  );

  // Remove user from friend
  const updateFriend = await User.findByIdAndUpdate(
    friendID,
    {
      $pull: { friends: { friendID: userID } },
    },
    { new: true },
  );

  if (!updateUser || !updateFriend) {
    throw new ErrorResponse({
      message:
        "Unbekannter Datenbank Fehler. Später erneut versuchen, oder Support kontaktieren",
      statusCode: 500,
      errorType: "ServerError",
      errorCode: "SYS_DATABASE_002",
    });
  }

  res.status(200).json({
    message:
      "Freund erfolgreich aus der Freundesliste und allen Features entfernt",
  });
});

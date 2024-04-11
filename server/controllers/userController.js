import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import User from "../models/User.js";

const secret = process.env.SECRET;
const expTime = process.env.EXPIRATION_TIME;
const saltRounds = 10;

export const getUser = asyncHandler(async (req, res, next) => {
  const { userID } = req;

  const user = await User.findById(userID).select("-passwordObj.password");
  if (!user) {
    throw new ErrorResponse({
      message: "Benutzer existiert nicht.",
      statusCode: 404,
      statusMessage: "Not Found",
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_002",
    });
  }

  res.status(200).json(user);
});

export const editUser = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { username, email, password } = req.body;

  const emptyBody = Object.keys(req.body).length === 0;
  if (emptyBody) {
    throw new ErrorResponse({
      message: "Keine Daten übermittelt.",
      statusCode: 400,
      statusMessage: "Bad Request",
      errorType: "BadRequestError",
      errorCode: "USER_DATA_VALIDATION_001",
    });
  }

  const user = await User.findById(userID);
  if (!user) {
    throw new ErrorResponse({
      message: "Benutzer existiert nicht.",
      statusCode: 404,
      statusMessage: "Not Found",
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_002",
    });
  }

  if (username) {
    const usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists && usernameAlreadyExists._id != userID) {
      throw new ErrorResponse({
        message: "Benutzername existiert bereits.",
        statusCode: 409,
        statusMessage: "Conflict",
        errorType: "ConflictError",
        errorCode: "USER_CONFLICT_001",
      });
    }
    user.username = username;
  }

  if (email) {
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists && emailAlreadyExists._id != userID) {
      throw new ErrorResponse({
        message: "E-Mail existiert bereits.",
        statusCode: 409,
        statusMessage: "Conflict",
        errorType: "ConflictError",
        errorCode: "USER_CONFLICT_002",
      });
    }
    user.email = email;
  }

  if (password) {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    user.passwordObj.password = hashPassword;
    user.passwordObj.lastPasswordUpdate = new Date();
  }

  await user.save();

  const token = jwt.sign({ _id: userID }, secret, { expiresIn: expTime });
  res.status(200).json({ token, message: "Benutzer erfolgreich aktualisiert" });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userID } = req;

  const user = await User.findById(userID);
  if (!user) {
    throw new ErrorResponse({
      message: "Benutzer existiert nicht.",
      statusCode: 404,
      statusMessage: "Not Found",
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_002",
    });
  }

  await user.deleteOne();

  res.status(200).json({ message: "User erfolgreich gelöscht." });
});

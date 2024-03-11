import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import User from "../models/User.js";

const secret = process.env.SECRET;
const expTime = process.env.EXPIRATION_TIME;

export const signUp = asyncHandler(async (req, res, next) => {
  const {
    body: { username, email, password, ...rest },
  } = req;

  const usernameAlreadyExists = await User.findOne({ username });
  const emailAlreadyExists = await User.findOne({ email });

  if (usernameAlreadyExists) {
    throw new ErrorResponse({
      message: "Benutzername existiert bereits.",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "USER_CONTROLLER_001",
    });
  }

  if (emailAlreadyExists) {
    throw new ErrorResponse({
      message: "E-Mail existiert bereits.",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "USER_CONTROLLER_002",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const { _id } = await User.create({
    username,
    email,
    password: hashPassword,
    ...rest,
  });
  const token = jwt.sign({ _id }, secret, {
    expiresIn: expTime,
  });

  res.status(201).json({ token, message: "Erfolgreich registriert." });
});

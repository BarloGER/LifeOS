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
  if (usernameAlreadyExists) {
    throw new ErrorResponse({
      message: "Benutzername existiert bereits.",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "USER_CONTROLLER_001",
    });
  }

  const emailAlreadyExists = await User.findOne({ email });
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
  res.status(201).json({ token, message: "Registrierung erfolgreich." });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    throw new ErrorResponse({
      message: "Es ist kein User mit dieser E-Mail registriert.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_CONTROLLER_003",
    });
  }

  const verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    throw new ErrorResponse({
      message: "Falsches Passwort.",
      statusCode: 401,
      errorType: "Unauthorized",
      errorCode: "USER_CONTROLLER_004",
    });
  }

  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expTime });
  res.status(201).json({ token, message: "Anmeldung erfolgreich" });
});

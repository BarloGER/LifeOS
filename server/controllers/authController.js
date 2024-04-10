import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import User from "../models/User.js";

const secret = process.env.SECRET;
const expTime = process.env.EXPIRATION_TIME;
const saltRounds = 10;

export const signUp = asyncHandler(async (req, res, next) => {
  const {
    body: { username, email, password, ...rest },
  } = req;

  const usernameAlreadyExists = await User.findOne({ username });
  if (usernameAlreadyExists) {
    throw new ErrorResponse({
      message: "Benutzername existiert bereits.",
      statusCode: 403,
      statusMessage: "Forbidden",
      errorType: "ConflictError",
      errorCode: "USER_CONFLICT_001",
    });
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new ErrorResponse({
      message: "E-Mail existiert bereits.",
      statusCode: 403,
      statusMessage: "Forbidden",
      errorType: "ConflictError",
      errorCode: "USER_CONFLICT_002",
    });
  }

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const { _id } = await User.create({
    username,
    email,
    passwordObj: {
      password: hashPassword,
      lastPasswordUpdate: new Date(),
    },
    lastLogin: new Date(),
    friends: [],
    messages: [{ friendRequestFrom: [] }],
    ...rest,
  });

  const token = jwt.sign({ _id }, secret, { expiresIn: expTime });
  res.status(201).json({ token, message: "Registrierung erfolgreich." });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse({
      message: "Es ist kein Benutzer mit dieser E-Mail registriert.",
      statusCode: 404,
      statusMessage: "Not Found",
      errorType: "NotFoundError",
      errorCode: "USER_NOTFOUND_001",
    });
  }

  const verifyPassword = await bcrypt.compare(
    password,
    user.passwordObj.password,
  );
  if (!verifyPassword) {
    throw new ErrorResponse({
      message: "Falsches Passwort.",
      statusCode: 401,
      statusMessage: "Unauthorized",
      errorType: "AuthenticationError",
      errorCode: "USER_LOGIN_001",
    });
  }

  user.lastLogin = new Date();
  await user.save({ timestamps: false });

  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expTime });
  res.status(201).json({ token, message: "Anmeldung erfolgreich" });
});

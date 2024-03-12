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

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const { _id } = await User.create({
    username,
    email,
    passwordObj: {
      password: hashPassword,
      lastPasswordUpdate: new Date(),
    },
    lastLogin: new Date(),
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
      message: "Es ist kein User mit dieser E-Mail registriert.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_CONTROLLER_003",
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
      errorType: "Unauthorized",
      errorCode: "USER_CONTROLLER_004",
    });
  }

  user.lastLogin = new Date();
  await user.save({ timestamps: false });

  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expTime });
  res.status(201).json({ token, message: "Anmeldung erfolgreich" });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { userID } = req;

  const user = await User.findById(userID).select("-passwordObj.password");
  if (!user) {
    throw new ErrorResponse({
      message: "User nicht gefunden.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_CONTROLLER_006",
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
      message: "Keine Daten empfangen.",
      statusCode: 400,
      errorType: "No Data",
      errorCode: "USER_CONTROLLER_007",
    });
  }

  const user = await User.findById(userID);
  console.log(user);
  if (!user) {
    throw new ErrorResponse({
      message: "User nicht gefunden.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_CONTROLLER_008",
    });
  }

  if (username) {
    const usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists && usernameAlreadyExists._id != userID) {
      throw new ErrorResponse({
        message: "Benutzername existiert bereits.",
        statusCode: 403,
        errorType: "Validation Error",
        errorCode: "USER_CONTROLLER_009",
      });
    }
    user.username = username;
  }

  if (email) {
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists && emailAlreadyExists._id != userID) {
      throw new ErrorResponse({
        message: "E-Mail existiert bereits.",
        statusCode: 403,
        errorType: "Validation Error",
        errorCode: "USER_CONTROLLER_010",
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
      message: "User nicht gefunden.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_CONTROLLER_011",
    });
  }

  await user.deleteOne();

  res.status(200).json({ message: "User erfolgreich gelöscht." });
});

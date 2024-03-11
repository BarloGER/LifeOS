import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    throw new ErrorResponse({
      message: "Bitte zuerst einloggen.",
      statusCode: 401,
      errorType: "Unauthorized",
      errorCode: "VERIFY_TOKEN_001",
    });
  }

  try {
    const { _id } = jwt.verify(authorization, process.env.SECRET);
    req.userID = _id;
    next();
  } catch (error) {
    throw new ErrorResponse({
      message: "Ungültiger Token",
      statusCode: 401,
      errorType: "Unauthorized",
      errorCode: "VERIFY_TOKEN_002",
    });
  }
});

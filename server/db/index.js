import mongoose from "mongoose";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const client = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB @ ${client.connection.host}`);
    return client;
  } catch (error) {
    throw new ErrorResponse({
      message: "Fehler bei der Verbindung zur Datenbank.",
      statusCode: 500,
      statusMessage: "Internal Server Error",
      errorType: "DependencyError",
      errorCode: "SYS_DATABASE_001",
    });
  }
};

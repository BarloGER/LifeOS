import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

export const connectTestDB = async () => {
  mongoose.set("strictQuery", true);
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri(), { dbName: "LifeOS" });
};

export const disconnectTestDB = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};

export const dropTestCollections = async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
};

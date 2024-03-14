import { Schema, model } from "mongoose";

const passwordObjSchema = new Schema(
  {
    password: { type: String, required: true },
    lastPasswordUpdate: { type: Date, default: Date.now },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordObj: passwordObjSchema,
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model("User", userSchema);

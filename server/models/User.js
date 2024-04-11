import { Schema, model } from "mongoose";

const passwordObjSchema = new Schema(
  {
    password: { type: String, required: true },
    lastPasswordUpdate: { type: Date, default: Date.now },
  },
  { _id: false },
);

const friendSchema = new Schema(
  {
    friendID: { type: String, required: true },
    friendUsername: { type: String, required: true },
  },
  { _id: false },
);

const friendRequestSchema = new Schema(
  {
    friendID: { type: String, required: true },
    friendUsername: { type: String, required: true },
  },
  { _id: false },
);

const messageSchema = new Schema(
  {
    friendRequestFrom: [friendRequestSchema],
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordObj: passwordObjSchema,
    lastLogin: { type: Date, default: Date.now },
    friends: [friendSchema],
    messages: [messageSchema],
  },
  { timestamps: true },
);

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

export default model("User", userSchema);

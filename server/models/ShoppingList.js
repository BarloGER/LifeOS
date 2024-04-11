import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
});

const friendSchema = new Schema(
  {
    friendID: { type: String, required: true },
    friendUsername: { type: String, required: true },
  },
  { _id: false },
);

const shoppingListSchema = new Schema(
  {
    ownerID: { type: String, required: true },
    name: { type: String, required: true },
    items: [itemSchema],
    sharedWith: [friendSchema],
    isLocked: { type: Boolean, default: false, required: true },
    lockedBy: {
      userID: { type: String, default: "" },
      username: { type: String, default: "" },
    },
    lockExpiresAt: { type: Date, default: null, required: false },
  },
  { timestamps: true },
);

export default model("ShoppingList", shoppingListSchema);

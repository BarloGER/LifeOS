import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
});

const friendSchema = new Schema(
  {
    friendID: { type: String, required: true, index: true },
    friendUsername: { type: String, required: true },
  },
  { _id: false },
);

const shoppingListSchema = new Schema(
  {
    ownerID: { type: String, required: true, index: true },
    name: { type: String, required: true },
    items: [itemSchema],
    sharedWith: [friendSchema],
    isLocked: { type: Boolean, default: false, required: true, index: true }, // Index hinzufügen
    lockedBy: {
      userID: { type: String, default: "", index: true }, // Index hinzufügen
      username: { type: String, default: "" },
    },
    lockExpiresAt: { type: Date, default: null, required: false, index: true }, // Index hinzufügen
  },
  { timestamps: true },
);

// Optional: Compound Index, wenn nötig
shoppingListSchema.index({ "lockedBy.userID": 1, lockExpiresAt: 1 });
shoppingListSchema.index({ "sharedWith.friendID": 1 });

export default model("ShoppingList", shoppingListSchema);

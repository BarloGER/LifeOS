import { Schema, model } from "mongoose";

const shoppingListSchema = new Schema(
  {
    ownerID: { type: String, required: true },
    name: { type: String, required: true },
    items: [
      {
        item: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: false },
      },
    ],
    sharedWith: [String],
  },
  { timestamps: true },
);

export default model("ShoppingList", shoppingListSchema);

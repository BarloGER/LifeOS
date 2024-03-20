import Router from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateJoi } from "../middlewares/validateJoi.js";
import { shoppingListSchema } from "../joi/shoppingListSchema.js";
import {
  createShoppingList,
  getAllShoppingLists,
  getSingleShoppingList,
  editShoppingList,
  deleteShoppingList,
} from "../controllers/shoppingListController.js";

export const shoppingListRouter = Router();

shoppingListRouter.post(
  "/shopping-lists",
  verifyToken,
  validateJoi(shoppingListSchema),
  createShoppingList,
);
shoppingListRouter.get("/shopping-lists", verifyToken, getAllShoppingLists);
shoppingListRouter.get(
  "/shopping-lists/:shoppingListID",
  verifyToken,
  getSingleShoppingList,
);
shoppingListRouter.put("/shopping-lists", verifyToken, editShoppingList);
shoppingListRouter.delete("/shopping-lists", verifyToken, deleteShoppingList);

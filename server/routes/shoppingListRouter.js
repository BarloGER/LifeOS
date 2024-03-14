import Router from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getAllShoppingLists,
  createShoppingList,
  editShoppingList,
  deleteShoppingList,
} from "../controllers/shoppingListController.js";

export const shoppingListRouter = Router();

shoppingListRouter.get("/shopping-lists", verifyToken, getAllShoppingLists);
shoppingListRouter.post("/shopping-lists", verifyToken, createShoppingList);
shoppingListRouter.put("/shopping-lists", verifyToken, editShoppingList);
shoppingListRouter.delete("/shopping-lists", verifyToken, deleteShoppingList);

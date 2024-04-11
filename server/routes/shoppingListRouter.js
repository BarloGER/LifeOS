import Router from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateJoi } from "../middlewares/validateJoi.js";
import {
  createShoppingListSchema,
  getAllShoppingListsSchema,
  getSingleShoppingListSchema,
  editShoppingListSchema,
  deleteShoppingListSchema,
} from "../joi/shoppingListSchemas.js";
import {
  getAllShoppingLists,
  createShoppingList,
  getSingleShoppingList,
  editShoppingList,
  deleteShoppingList,
} from "../controllers/shoppingListController.js";

export const shoppingListRouter = Router();

shoppingListRouter.get(
  "/shopping-lists",
  verifyToken,
  validateJoi(getAllShoppingListsSchema),
  getAllShoppingLists,
);
shoppingListRouter.post(
  "/shopping-lists",
  verifyToken,
  validateJoi(createShoppingListSchema),
  createShoppingList,
);

shoppingListRouter.get(
  "/shopping-lists/:shoppingListID",
  verifyToken,
  validateJoi(getSingleShoppingListSchema),
  getSingleShoppingList,
);
shoppingListRouter.put(
  "/shopping-lists/:shoppingListID",
  verifyToken,
  validateJoi(editShoppingListSchema),
  editShoppingList,
);
shoppingListRouter.delete(
  "/shopping-lists/:shoppingListID",
  verifyToken,
  validateJoi(deleteShoppingListSchema),
  deleteShoppingList,
);

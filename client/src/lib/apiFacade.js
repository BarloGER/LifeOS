import {
  signUp,
  signIn,
  getUser,
  editUser,
  deleteUser,
} from "../features/authentication";

import {
  createShoppingList,
  getAllShoppingLists,
  getSingleShoppingList,
} from "../features/shopping-lists";
import {
  deleteShoppingList,
  editShoppingList,
} from "../features/shopping-lists/services/shoppingListFetches";

export const api = {
  // User-methods
  signUp: (credentials) => signUp(credentials),
  signIn: (credentials) => signIn(credentials),
  getUser: (token) => getUser(token),
  editUser: (updatedData, token) => editUser(updatedData, token),
  deleteUser: (token) => deleteUser(token),

  //Shopping List methods
  createShoppingList: (token, newShoppingList) =>
    createShoppingList(token, newShoppingList),
  getAllShoppingLists: (token) => getAllShoppingLists(token),
  getSingleShoppingList: (token, shoppingListID) =>
    getSingleShoppingList(token, shoppingListID),
  editShoppingList: (token, updatedData) =>
    editShoppingList(token, updatedData),
  deleteShoppingList: (token, shoppingListID) =>
    deleteShoppingList(token, shoppingListID),
};

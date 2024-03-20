import {
  signUp,
  signIn,
  getUser,
  editUser,
  deleteUser,
} from "../features/authentication";

import {
  getAllShoppingLists,
  getSingleShoppingList,
} from "../features/shopping-lists";

export const api = {
  // User-methods
  signUp: (credentials) => signUp(credentials),
  signIn: (credentials) => signIn(credentials),
  getUser: (token) => getUser(token),
  editUser: (updatedData, token) => editUser(updatedData, token),
  deleteUser: (token) => deleteUser(token),

  //Shopping List methods
  getAllShoppingLists: (token) => getAllShoppingLists(token),
  getSingleShoppingList: (token, shoppingListID) =>
    getSingleShoppingList(token, shoppingListID),
};

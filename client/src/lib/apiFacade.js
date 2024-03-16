import {
  signUp,
  signIn,
  getUser,
  editUser,
  deleteUser,
} from "../features/authentication";

import { getAllShoppingLists } from "../features/shopping-list/services/shoppingListFetches";

export const api = {
  // User-methods
  signUp: (credentials) => signUp(credentials),
  signIn: (credentials) => signIn(credentials),
  getUser: (token) => getUser(token),
  editUser: (updatedData, token) => editUser(updatedData, token),
  deleteUser: (token) => deleteUser(token),

  //Shopping List methods
  getAllShoppingLists: (token) => getAllShoppingLists(token),
};

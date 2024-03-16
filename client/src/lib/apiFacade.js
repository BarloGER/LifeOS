import {
  getUser,
  loginUser,
  registerUser,
  editUser,
  deleteUser,
} from "../features/authentication";

import { getAllShoppingLists } from "../features/shopping-list/services/shoppingListFetches";

const api = {
  // User-methods
  getUser: (token) => getUser(token),
  loginUser: (credentials) => loginUser(credentials),
  registerUser: (credentials) => registerUser(credentials),
  editUser: (updatedData, token) => editUser(updatedData, token),
  deleteUser: (token) => deleteUser(token),

  //Shopping List methods
  getAllShoppingLists: (token) => getAllShoppingLists(token),
};

export default api;

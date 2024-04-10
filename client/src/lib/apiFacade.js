import {
  signUp,
  signIn,
  getUser,
  editUser,
  deleteUser,
  getUserByUsername,
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
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../features/message-center";

export const api = {
  // User-methods
  signUp: (credentials) => signUp(credentials),
  signIn: (credentials) => signIn(credentials),
  getUser: (token) => getUser(token),
  editUser: (token, updatedData) => editUser(token, updatedData),
  deleteUser: (token) => deleteUser(token),
  getUserByUsername: (token, username) => getUserByUsername(token, username),

  // Shopping List methods
  createShoppingList: (token, newShoppingList) =>
    createShoppingList(token, newShoppingList),
  getAllShoppingLists: (token) => getAllShoppingLists(token),
  getSingleShoppingList: (token, shoppingListID) =>
    getSingleShoppingList(token, shoppingListID),
  editShoppingList: (token, shoppingListID, updatedData) =>
    editShoppingList(token, shoppingListID, updatedData),
  deleteShoppingList: (token, shoppingListID) =>
    deleteShoppingList(token, shoppingListID),

  // Friend-methods
  acceptFriendRequest: (token, acceptData) =>
    acceptFriendRequest(token, acceptData),
  rejectFriendRequest: (token, rejectData) =>
    rejectFriendRequest(token, rejectData),
  sendFriendRequest: (token, friendData) =>
    sendFriendRequest(token, friendData),
};

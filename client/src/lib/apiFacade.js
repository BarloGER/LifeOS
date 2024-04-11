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
  editShoppingList,
  deleteShoppingList,
} from "../features/shopping-lists";
import {
  getFriendByUsername,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../features/friendship-system";

export const api = {
  // User-methods
  signUp: (credentials) => signUp(credentials),
  signIn: (credentials) => signIn(credentials),
  getUser: (token) => getUser(token),
  editUser: (token, updatedData) => editUser(token, updatedData),
  deleteUser: (token) => deleteUser(token),

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
  getFriendByUsername: (token, username) =>
    getFriendByUsername(token, username),
  acceptFriendRequest: (token, acceptData) =>
    acceptFriendRequest(token, acceptData),
  rejectFriendRequest: (token, rejectData) =>
    rejectFriendRequest(token, rejectData),
  sendFriendRequest: (token, friendData) =>
    sendFriendRequest(token, friendData),
};

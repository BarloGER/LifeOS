import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import ShoppingList from "../models/ShoppingList.js";

// ToDo: Sicherstellen, dass sharedWith nur genutzt werden kann ,wenn der User auch wirklich ein Freund ist.

export const createShoppingList = asyncHandler(async (req, res, next) => {
  const { ownerID, name, items, sharedWith } = req.body;

  await ShoppingList.create({
    ownerID,
    name,
    items,
    sharedWith,
  });

  res.status(201).json({ message: "Einkaufsliste erfolgreich erstellt." });
});

export const getAllShoppingLists = asyncHandler(async (req, res, next) => {
  const { userID } = req;

  const shoppingLists = await ShoppingList.find({
    $or: [{ ownerID: userID }, { "sharedWith.friendID": userID }],
  });

  res.status(200).json({
    shoppingLists,
    message: "Vorhandene Einkaufslisten erfolgreich abgefragt.",
  });
});

export const getSingleShoppingList = asyncHandler(async (req, res, next) => {
  const { shoppingListID } = req.params;

  const shoppingList = await ShoppingList.findById(shoppingListID);
  if (!shoppingList) {
    return next(
      new ErrorResponse({
        message: "Diese Einkaufsliste existiert nicht.",
        statusCode: 404,
        errorType: "Not Found",
        errorCode: "SHOPPING_LIST_NOTFOUND_002",
      }),
    );
  }

  res.status(200).json({
    shoppingList,
  });
});

export const editShoppingList = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { shoppingListID } = req.params;
  const { name, items, sharedWith } = req.body;

  const shoppingList = await ShoppingList.findById(shoppingListID);
  if (!shoppingList) {
    throw new ErrorResponse({
      message: "Diese Einkaufsliste existiert nicht.",
      statusCode: 404,
      statusMessage: "Not Found",
      errorType: "NotFoundError",
      errorCode: "SHOPPING_LIST_NOTFOUND_001",
    });
  }

  if (
    !(
      userID === shoppingList.ownerID ||
      shoppingList.sharedWith.friendID.includes(userID)
    )
  ) {
    throw new ErrorResponse({
      message:
        "Du kannst nur Einkaufslisten editieren, die du erstellt hast, oder zu denen du eingeladen wurdest.",
      statusCode: 403,
      statusMessage: "Forbidden",
      errorType: "AuthorizationError",
      errorCode: "SHOPPING_LIST_PERMISSION_001",
    });
  }

  if (name) {
    shoppingList.name = name;
  }

  if (items && items !== shoppingList.items) {
    shoppingList.items = items;
  }

  if (sharedWith && sharedWith !== shoppingList.sharedWith) {
    shoppingList.sharedWith = sharedWith;
  }

  await shoppingList.save();

  res.status(200).json({ message: "Einkaufsliste erfolgreich aktualisiert." });
});

export const deleteShoppingList = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { shoppingListID } = req.params;

  const shoppingList = await ShoppingList.findById(shoppingListID);
  if (!shoppingList) {
    throw new ErrorResponse({
      message: "Diese Einkaufsliste existiert nicht.",
      statusCode: 404,
      statusMessage: "Not Found",
      errorType: "NotFoundError",
      errorCode: "SHOPPING_LIST_NOTFOUND_001",
    });
  }

  if (userID !== shoppingList.ownerID) {
    throw new ErrorResponse({
      message: "Du kannst nur Listen löschen, die du erstellt hast.",
      statusCode: 403,
      statusMessage: "Forbidden",
      errorType: "AuthorizationError",
      errorCode: "SHOPPING_LIST_PERMISSION_002",
    });
  }

  await shoppingList.deleteOne();

  res.status(200).json({ message: "Einkaufsliste erfolgreich gelöscht." });
});

import { apiFetch } from "../../../lib/fetch";

export const createShoppingList = async (token, newShoppingList) => {
  const response = await apiFetch(
    "/auth/shopping-lists",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShoppingList),
    },
    token
  );

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

export const getAllShoppingLists = async (token) => {
  const response = await apiFetch(
    `/auth/shopping-lists`,
    { method: "GET" },
    token
  );

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

export const getSingleShoppingList = async (token, shoppingListID) => {
  const response = await apiFetch(
    `/auth/shopping-lists/${shoppingListID}`,
    { method: "GET" },
    token
  );

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

export const editShoppingList = async (token, shoppingListID, updatedData) => {
  const response = await apiFetch(
    `/auth/shopping-lists/${shoppingListID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    },
    token
  );

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

export const deleteShoppingList = async (token, shoppingListID) => {
  const response = await apiFetch(
    `/auth/shopping-lists/${shoppingListID}`,
    { method: "DELETE" },
    token
  );

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

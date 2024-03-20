import { apiFetch } from "../../../lib/fetch";

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

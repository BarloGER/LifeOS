import { apiFetch } from "../../../lib/fetch";

export const signUp = async (credentials) => {
  const response = await apiFetch(`/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

export const signIn = async (credentials) => {
  const response = await apiFetch(`/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

export const getUser = async (token) => {
  const response = await apiFetch(`/auth/me`, { method: "GET" }, token);

  if (response.error) {
    throw new Error(
      response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
    );
  }

  return response.data;
};

export const editUser = async (token, updatedData) => {
  const response = await apiFetch(
    `/auth/me`,
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

export const deleteUser = async (token) => {
  const response = await apiFetch(
    `/auth/me`,
    {
      method: "DELETE",
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

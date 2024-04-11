import { apiFetch } from "../../../lib/fetch";

export const getFriendByUsername = async (token, username) => {
  const response = await apiFetch(
    `/auth/friend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
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

export const acceptFriendRequest = async (token, acceptData) => {
  const response = await apiFetch(
    `/auth/friend/accept-request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acceptData),
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

export const rejectFriendRequest = async (token, rejectData) => {
  const response = await apiFetch(
    `/auth/friend/reject-request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rejectData),
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

export const sendFriendRequest = async (token, friendData) => {
  const response = await apiFetch(
    `/auth/friend/send-request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friendData),
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

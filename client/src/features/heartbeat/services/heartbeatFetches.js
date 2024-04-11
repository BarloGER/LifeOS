import { apiFetch } from "../../../lib/fetch";

export const getLockStatus = async (token, featureID, featureData) => {
  const response = await apiFetch(
    `/auth/heartbeat/${featureID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featureData),
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

export const sendHeartbeat = async (token, featureID, featureData) => {
  const response = await apiFetch(
    `/auth/heartbeat/${featureID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featureData),
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

export const lockFeatureEdit = async (token, featureID, featureData) => {
  const response = await apiFetch(
    `/auth/heartbeat/lock/${featureID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featureData),
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

export const unlockFeatureEdit = async (token, featureID, featureData) => {
  const response = await apiFetch(
    `/auth/heartbeat/unlock/${featureID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featureData),
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

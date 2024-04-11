import PropTypes from "prop-types";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/apiFacade.js";
import { ShoppingListDetailView } from "../features/shopping-lists";
import { LoadingScreen } from "../components/ui/LoadingSceen";

export const ShoppingListDetails = ({ user }) => {
  const { shoppingListID } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [shoppingListDetails, setShoppingListDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deletionRequest, setDeletionRequest] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heartbeatActiveRef = useRef(false);
  const heartbeatIntervalIdRef = useRef(null);
  const [editableList, setEditableList] = useState({
    name: "",
    items: [{ name: "", quantity: "", unit: "" }],
    sharedWith: [],
  });

  const fetchListDetails = useCallback(async () => {
    try {
      const response = await api.getSingleShoppingList(token, shoppingListID);
      if (response && response.shoppingList) {
        const storedListStatus = JSON.parse(
          localStorage.getItem(`shoppingListID: ${shoppingListID}`) || "{}"
        );
        const updatedItems = response.shoppingList.items.map((item) => ({
          ...item,
          completed: !!storedListStatus[item._id],
        }));
        setShoppingListDetails({
          ...response.shoppingList,
          items: updatedItems,
        });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [token, shoppingListID]);

  useEffect(() => {
    fetchListDetails();
  }, [fetchListDetails]);

  const startHeartbeat = () => {
    const featureData = {
      featureType: "ShoppingList",
    };

    if (heartbeatActiveRef.current) {
      console.log("Heartbeat is already running.");
      return;
    }

    heartbeatActiveRef.current = true;
    heartbeatIntervalIdRef.current = setInterval(async () => {
      if (!heartbeatActiveRef.current) {
        console.log("Heartbeat has been stopped, stopping interval.");
        clearInterval(heartbeatIntervalIdRef.current);
        return;
      }

      try {
        const data = await api.sendHeartbeat(
          token,
          shoppingListID,
          featureData
        );
        console.log("Heartbeat sent:", data);
      } catch (error) {
        console.error("Error updating the lock:", error.message);
        stopHeartbeat();
      }
    }, 60000);
  };

  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalIdRef.current) {
      clearInterval(heartbeatIntervalIdRef.current);
      heartbeatIntervalIdRef.current = null;
      heartbeatActiveRef.current = false;
      console.log("Heartbeat stopped.");
    }
  }, []);

  const lockEdit = async () => {
    const featureData = {
      featureType: "ShoppingList",
      username: user.username,
    };

    try {
      const data = await api.lockFeatureEdit(
        token,
        shoppingListID,
        featureData
      );
      if (data.message) {
        console.log("Feature locked");
      }
    } catch (error) {
      console.error("Fehler beim setzen der Sperre: ", error.message);
      stopHeartbeat();
    }
  };

  const unlockEdit = useCallback(async () => {
    const featureData = {
      featureType: "ShoppingList",
    };

    try {
      const data = await api.unlockFeatureEdit(
        token,
        shoppingListID,
        featureData
      );
      if (data.message) {
        console.log("Feature unlocked");
        stopHeartbeat();
      }
    } catch (error) {
      console.error("Fehler beim Entsperren: ", error.message);
      stopHeartbeat();
    }
  }, [token, shoppingListID, stopHeartbeat]);

  const toggleItemCompletion = (id) => {
    setShoppingListDetails((prevDetails) => {
      const updatedItems = prevDetails.items.map((item) => {
        if (item._id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });

      const updatedStatus = updatedItems.reduce((acc, item) => {
        acc[item._id] = item.completed;
        return acc;
      }, {});

      localStorage.setItem(
        `shoppingListID: ${shoppingListID}`,
        JSON.stringify(updatedStatus)
      );

      return { ...prevDetails, items: updatedItems };
    });
  };

  const deleteShoppingList = async () => {
    try {
      const data = await api.deleteShoppingList(token, shoppingListID);
      if (data.message) {
        setSuccessMessage(data.message);
        setDeletionRequest(false);
        stopHeartbeat();
        setTimeout(() => {
          navigate("/auth/shopping-lists");
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditClick = async () => {
    setIsLoading(true);

    const featureData = {
      featureType: "ShoppingList",
    };

    try {
      const lockStatus = await api.getLockStatus(
        token,
        shoppingListID,
        featureData
      );
      if (lockStatus.isLocked && lockStatus.lockedBy !== user.username) {
        setIsLoading(false);
        setErrorMessage(
          `Das Feature wird derzeit von ${lockStatus.lockedBy} bearbeitet.`
        );
        return;
      }

      // Wenn nicht gesperrt, sperren und Bearbeitung fortsetzen
      await lockEdit();
      if (shoppingListDetails) {
        setEditableList({
          name: shoppingListDetails.name,
          items: shoppingListDetails.items.map((item) => ({ ...item })),
          sharedWith: shoppingListDetails.sharedWith.map((friend) => ({
            ...friend,
          })),
        });
        setIsEditing(true);
        startHeartbeat();
      }
      await fetchListDetails();
    } catch (error) {
      console.error("Fehler beim Überprüfen der Sperre: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveListChanges = async () => {
    setIsLoading(true);
    const listToSend = {
      ...editableList,
      items: editableList.items.map(({ completed, ...item }) => item), // eslint-disable-line no-unused-vars
    };
    console.log(editableList);
    try {
      const data = await api.editShoppingList(
        token,
        shoppingListID,
        listToSend
      );
      if (data.message) {
        setSuccessMessage(data.message);
        setIsEditing(false);
        stopHeartbeat();
        unlockEdit();
        setIsLoading(false);
        await fetchListDetails();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (isEditing) {
          console.log(
            "Inaktivität erkannt. Versuche, das Feature freizugeben und den Heartbeat zu stoppen."
          );
          unlockEdit();
          stopHeartbeat();
        }
      }, 300000);
    };

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keypress", resetInactivityTimer);
    window.addEventListener("touchmove", resetInactivityTimer);
    window.addEventListener("scroll", resetInactivityTimer);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keypress", resetInactivityTimer);
      window.removeEventListener("touchmove", resetInactivityTimer);
      window.removeEventListener("scroll", resetInactivityTimer);
    };
  }, [isEditing, stopHeartbeat, unlockEdit]);

  if (!shoppingListDetails) return <LoadingScreen />;

  return (
    <ShoppingListDetailView
      user={user}
      shoppingListDetails={shoppingListDetails}
      editableList={editableList}
      setEditableList={setEditableList}
      toggleItemCompletion={toggleItemCompletion}
      deleteShoppingList={deleteShoppingList}
      saveListChanges={saveListChanges}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      deletionRequest={deletionRequest}
      setDeletionRequest={setDeletionRequest}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleEditClick={handleEditClick}
      stopHeartbeat={stopHeartbeat}
      unlockEdit={unlockEdit}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

ShoppingListDetails.propTypes = {
  user: PropTypes.object,
};

import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
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

  if (!shoppingListDetails) return <LoadingScreen />;

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
        setTimeout(() => {
          navigate("/auth/shopping-lists");
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditClick = async () => {
    if (shoppingListDetails) {
      setEditableList({
        name: shoppingListDetails.name,
        items: shoppingListDetails.items.map((item) => ({ ...item })),
        sharedWith: shoppingListDetails.sharedWith.map((friend) => ({
          ...friend,
        })),
      });
      setIsEditing(true);
    }
    await fetchListDetails();
  };

  const saveListChanges = async () => {
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
        await fetchListDetails();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

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
    />
  );
};

ShoppingListDetails.propTypes = {
  user: PropTypes.object,
};

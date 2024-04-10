import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../lib/apiFacade";
import { LoadingScreen } from "../../../components/ui/LoadingSceen";
import "../assets/shopping-list-details.css";
import { ImBin2 } from "react-icons/im";
import { Message } from "../../../components/ui/Message";
import { FriendShareList } from "../../../components/ui/FriendShareList";
import { MdClose } from "react-icons/md";

export const ShoppingListDetails = ({ user }) => {
  const { shoppingListID } = useParams();
  const [shoppingListDetails, setShoppingListDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [deletionRequest, setDeletionRequest] = useState(false);
  const [editableList, setEditableList] = useState({
    name: "",
    items: [{ name: "", quantity: "", unit: "" }],
    sharedWith: [],
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

  const handleChangeListName = (e) => {
    setEditableList((prevList) => ({
      ...prevList,
      name: e.target.value,
    }));
  };

  const handleChangeItem = (index, field) => (e) => {
    const updatedItems = [...editableList.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: e.target.value,
    };
    setEditableList((prevList) => ({
      ...prevList,
      items: updatedItems,
    }));
  };

  const addNewItem = () => {
    setEditableList((prevList) => ({
      ...prevList,
      items: [
        ...prevList.items,
        { name: "", quantity: "", unit: "", completed: false },
      ],
    }));
  };

  const removeItem = (index) => {
    setEditableList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const saveListChanges = async () => {
    try {
      const data = await api.editShoppingList(
        token,
        shoppingListID,
        editableList
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

  return isEditing ? (
    <section className="edit-shopping-list-details-container">
      <div className="edit-shopping-list-details">
        <div className="close-button">
          <MdClose onClick={() => setIsEditing(false)} />
        </div>
        <div className="edit-list-heading">
          <h3>Einkaufslisten Name</h3>
          <input value={editableList.name} onChange={handleChangeListName} />
        </div>
        <div className="items-table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>#</th>
                <th>Art</th>
              </tr>
            </thead>
            <tbody>
              {editableList.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      placeholder="Name"
                      value={item.name}
                      onChange={handleChangeItem(index, "name")}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="Anzahl"
                      value={item.quantity}
                      onChange={handleChangeItem(index, "quantity")}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="Art z.B: Dose"
                      value={item.unit}
                      onChange={handleChangeItem(index, "unit")}
                    />
                  </td>
                  <td>
                    <button
                      className="remove-item"
                      onClick={() => removeItem(index)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Message
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        <div className="items-action-btns">
          <button onClick={addNewItem}>Neues Feld Hinzufügen</button>
        </div>

        <div className="form-action-btns">
          <button onClick={() => saveListChanges()}>Speichern</button>
          <button onClick={() => setIsEditing(false)}>Abbrechen</button>
          <button onClick={() => setOpenShare(!openShare)}>Teilen mit</button>
        </div>

        <FriendShareList
          openShare={openShare}
          friends={user.friends}
          sharedWith={editableList.sharedWith}
          setFeatureState={setEditableList}
        />
      </div>
    </section>
  ) : (
    <section className="shopping-list-details-container">
      <div className="shopping-list-details">
        <h2>{shoppingListDetails.name}</h2>
        <table className="items-table-container">
          <thead>
            <tr>
              <th className="name">Name</th>
              <th className="quantity">#</th>
              <th className="unit">Art</th>
              <th className="checkbox"></th>
            </tr>
          </thead>
          <tbody>
            {shoppingListDetails.items.map((item) => (
              <tr key={item._id} className={item.completed ? "completed" : ""}>
                <td className="name">{item.name}</td>
                <td className="quantity">{item.quantity}</td>
                <td className="unit">{item.unit}</td>
                <td className="checkbox">
                  <label className="checkbox">
                    <input
                      className="checkmark"
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItemCompletion(item._id)}
                    />
                    <span className="checkmark"></span>{" "}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletionRequest ? (
        <div className="deletion-request">
          <button className="deletion" onClick={() => deleteShoppingList()}>
            Löschen
          </button>
          <button onClick={() => setDeletionRequest(false)}>Abbrechen</button>
        </div>
      ) : (
        <div className="footer">
          <Message
            className="message"
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <button
            onClick={() => {
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
            }}
          >
            Bearbeiten
          </button>

          <ImBin2 className="bin" onClick={() => setDeletionRequest(true)} />
        </div>
      )}
    </section>
  );
};

ShoppingListDetails.propTypes = {
  user: PropTypes.object,
};

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ImBin2 } from "react-icons/im";
import { Message } from "../../../components/ui/Message";
import { FriendShareList } from "../../friendship-system";
import { MdClose, MdArrowBack } from "react-icons/md";
import "../assets/shopping-list-detail-view.css";

export const ShoppingListDetailView = ({
  user,
  shoppingListDetails,
  editableList,
  setEditableList,
  toggleItemCompletion,
  deleteShoppingList,
  saveListChanges,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  deletionRequest,
  setDeletionRequest,
  isEditing,
  setIsEditing,
  handleEditClick,
}) => {
  const [openShare, setOpenShare] = useState(false);

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

  return isEditing ? (
    <section className="edit-shopping-list-details-container">
      <div className="edit-shopping-list-details">
        <div className="close-button">
          <MdClose
            onClick={() => {
              setIsEditing(false);
              setOpenShare(false);
            }}
          />
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
          <button onClick={() => setOpenShare(!openShare)}>
            {openShare ? "Schließen" : "Teilen"}
          </button>
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

          <div className="footer-buttons">
            <Link to="/auth/shopping-lists">
              <MdArrowBack />
            </Link>
            <button onClick={() => handleEditClick()}>Bearbeiten</button>
            <ImBin2 className="bin" onClick={() => setDeletionRequest(true)} />
          </div>
        </div>
      )}
    </section>
  );
};

ShoppingListDetailView.propTypes = {
  user: PropTypes.object,
  shoppingListDetails: PropTypes.object.isRequired,
  editableList: PropTypes.object.isRequired,
  setEditableList: PropTypes.func.isRequired,
  toggleItemCompletion: PropTypes.func.isRequired,
  deleteShoppingList: PropTypes.func.isRequired,
  saveListChanges: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  deletionRequest: PropTypes.bool.isRequired,
  setDeletionRequest: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

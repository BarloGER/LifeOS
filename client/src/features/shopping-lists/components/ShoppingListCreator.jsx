import PropTypes from "prop-types";
import { FriendShareList } from "../../friendship-system/components/FriendShareList";
import { Message } from "../../../components/ui/Message";
import "../assets/shopping-list-creator.css";

export const ShoppingListCreator = ({
  MdClose,
  setShowNewList,
  newShoppingList,
  setNewShoppingList,
  openShare,
  setOpenShare,
  user,
  createNewShoppingList,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  cancelShoppingListEdit,
}) => {
  const handleChangeListName = (event) => {
    setNewShoppingList((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleChangeItem = (index, field) => (event) => {
    const updatedItems = [...newShoppingList.items];
    updatedItems[index][field] = event.target.value;
    setNewShoppingList((prev) => ({ ...prev, items: updatedItems }));
  };

  const addNewItem = () => {
    setNewShoppingList((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: "", unit: "" }],
    }));
  };

  const removeItem = (indexToRemove) => {
    if (newShoppingList.items.length === 0) {
      return;
    }

    setNewShoppingList((prev) => ({
      ...prev,
      items: prev.items.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <section className="new-list-container">
      <div className="close-button">
        <MdClose
          onClick={() => {
            setShowNewList(false);
            setOpenShare(false);
          }}
        />
      </div>
      <div className="new-list-heading">
        <h3>Einkaufslisten Name</h3>
        <input value={newShoppingList.name} onChange={handleChangeListName} />
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
            {newShoppingList.items.map((item, index) => (
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
        <button onClick={() => createNewShoppingList()}>Speichern</button>
        <button onClick={() => cancelShoppingListEdit()}>Abbrechen</button>
        <button onClick={() => setOpenShare(!openShare)}>
          {openShare ? "Schließen" : "Teilen"}
        </button>
      </div>
      <FriendShareList
        openShare={openShare}
        friends={user.friends}
        sharedWith={newShoppingList.sharedWith}
        setFeatureState={setNewShoppingList}
      />
    </section>
  );
};

ShoppingListCreator.propTypes = {
  MdClose: PropTypes.func.isRequired,
  setShowNewList: PropTypes.func.isRequired,
  newShoppingList: PropTypes.object.isRequired,
  setNewShoppingList: PropTypes.func.isRequired,
  openShare: PropTypes.bool.isRequired,
  setOpenShare: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  createNewShoppingList: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  cancelShoppingListEdit: PropTypes.func.isRequired,
};

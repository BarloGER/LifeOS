import PropTypes from "prop-types";
import { FriendShareList } from "../../../components/ui/FriendShareList";
import { Message } from "../../../components/ui/Message";

export const NewShoppingList = ({
  MdClose,
  setShowNewList,
  list,
  setList,
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
    setList((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleChangeItem = (index, field) => (event) => {
    const updatedItems = [...list.items];
    updatedItems[index][field] = event.target.value;
    setList((prev) => ({ ...prev, items: updatedItems }));
  };

  const addNewItem = () => {
    setList((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: "", unit: "" }],
    }));
  };

  const removeItem = () => {
    setList((prev) => ({
      ...prev,
      items: prev.items.slice(0, -1),
    }));
  };

  return (
    <section className="new-list-container">
      <div className="close-button">
        <MdClose onClick={() => setShowNewList(false)} />
      </div>
      <div className="new-list-heading">
        <h3>Einkaufslisten Name</h3>
        <input value={list.name} onChange={handleChangeListName} />
      </div>
      <div className="item-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Anzahl</th>
              <th>Art</th>
            </tr>
          </thead>
          <tbody>
            {list.items.map((item, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-wrapper-1">
        <button onClick={addNewItem}>Hinzufügen</button>
        <button onClick={removeItem}>Entfernen</button>
      </div>

      <Message
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <div className="button-wrapper-2">
        <button onClick={() => createNewShoppingList()}>Speichern</button>
        <button onClick={() => cancelShoppingListEdit()}>Abbrechen</button>
        <button onClick={() => setOpenShare(!openShare)}>Teilen mit</button>
      </div>
      <FriendShareList
        openShare={openShare}
        friends={user.friends}
        sharedWith={list.sharedWith}
        setFeatureState={setList}
      />
    </section>
  );
};

NewShoppingList.propTypes = {
  MdClose: PropTypes.func.isRequired,
  setShowNewList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
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

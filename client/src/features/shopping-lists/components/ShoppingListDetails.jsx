import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../lib/apiFacade";
import { LoadingScreen } from "../../../components/ui/LoadingSceen";
import "../assets/shopping-list-details.css";
import { ImBin2 } from "react-icons/im";
import { Message } from "../../../components/ui/Message";

export const ShoppingListDetails = () => {
  const { shoppingListID } = useParams();
  const [shoppingListDetails, setShoppingListDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchListDetails = async () => {
      const response = await api.getSingleShoppingList(token, shoppingListID);
      if (response && response.shoppingList) {
        setShoppingListDetails(response.shoppingList);
      }
    };

    fetchListDetails();
  }, [token, shoppingListID]);

  if (!shoppingListDetails) return <LoadingScreen />;

  const deleteShoppingList = async () => {
    try {
      const data = await api.deleteShoppingList(token, shoppingListID);
      if (data.message) {
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate("/auth/shopping-lists");
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="shopping-list-details-container">
      <div className="shopping-list-details">
        <h2>{shoppingListDetails.name}</h2>
        <table className="items-table-container">
          <thead>
            <tr>
              <th className="checkbox"></th>
              <th className="name">Name</th>
              <th className="quantity">#</th>
              <th className="unit">Art</th>
            </tr>
          </thead>
          <tbody>
            {shoppingListDetails.items.map((item) => (
              <tr key={item._id}>
                <td>
                  <input type="checkbox" checked={item.completed} readOnly />
                </td>
                <td className="name">{item.name}</td>
                <td className="quantity">{item.quantity}</td>
                <td className="unit">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <Message
          className="message"
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        <button>Bearbeiten</button>
        <ImBin2 className="bin" onClick={deleteShoppingList} />
      </div>
    </section>
  );
};

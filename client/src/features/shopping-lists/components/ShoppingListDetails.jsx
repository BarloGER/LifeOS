import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/apiFacade";
import "../assets/shopping-lists.css";

export const ShoppingListDetails = () => {
  const { shoppingListID } = useParams();
  const [details, setDetails] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchListDetails = async () => {
      const response = await api.getSingleShoppingList(token, shoppingListID);
      if (response && response.shoppingList) {
        setDetails(response.shoppingList);
      }
    };

    fetchListDetails();
  }, [token, shoppingListID]);

  if (!details) return <p>Lädt...</p>;

  return (
    <section className="shopping-lists-container">
      <h2>{details.name}</h2>
      <ul>
        {details.items.map((item) => (
          <li key={item._id}>
            <input type="checkbox" checked={item.completed} readOnly />
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

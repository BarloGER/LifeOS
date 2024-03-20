import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { ShoppingListsCollection } from "../features/shopping-lists/components/ShoppingListsCollection";
import { api } from "../lib/apiFacade";

export const ShoppingLists = ({ user }) => {
  const [shoppingLists, setShoppingLists] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyMine, setShowOnlyMine] = useState(() => {
    const saved = localStorage.getItem("showOnlyMine");
    return saved ? JSON.parse(saved) : false;
  });
  const token = localStorage.getItem("token");

  const fetchShoppingLists = useCallback(async () => {
    const response = await api.getAllShoppingLists(token);
    if (response && response.shoppingLists) {
      setShoppingLists(response.shoppingLists);
    }
  }, [token]);

  useEffect(() => {
    fetchShoppingLists();
  }, [fetchShoppingLists]);

  useEffect(() => {
    localStorage.setItem("showOnlyMine", JSON.stringify(showOnlyMine));
  }, [showOnlyMine]);

  const filteredLists = shoppingLists
    ? shoppingLists.filter(
        (list) =>
          list.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!showOnlyMine || list.ownerID === user._id)
      )
    : [];

  return (
    <ShoppingListsCollection
      shoppingLists={filteredLists}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showOnlyMine={showOnlyMine}
      setShowOnlyMine={setShowOnlyMine}
    />
  );
};

ShoppingLists.propTypes = {
  user: PropTypes.object,
};

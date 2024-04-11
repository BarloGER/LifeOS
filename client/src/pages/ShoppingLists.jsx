import PropTypes from "prop-types";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ShoppingListsCollection } from "../features/shopping-lists";
import { api } from "../lib/apiFacade";

export const ShoppingLists = ({ user }) => {
  const token = localStorage.getItem("token");
  const [shoppingLists, setShoppingLists] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newShoppingList, setNewShoppingList] = useState({
    ownerID: user._id,
    name: "",
    items: [{ name: "", quantity: "", unit: "" }],
    sharedWith: [],
  });
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("shopping-list-settings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : { showOnlyMine: false, sortBy: "", sortDirection: "ascending" };
  });
  const [openShare, setOpenShare] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNewList, setShowNewList] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchShoppingLists = useCallback(async () => {
    let response = await api.getAllShoppingLists(token);
    if (response && response.shoppingLists) {
      setShoppingLists(response.shoppingLists);
    }
  }, [token]);

  useEffect(() => {
    fetchShoppingLists();
  }, [fetchShoppingLists]);

  useEffect(() => {
    localStorage.setItem("shopping-list-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (settingsKey, value) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, [settingsKey]: value };
      localStorage.setItem(
        "shopping-list-settings",
        JSON.stringify(updatedSettings)
      );
      return updatedSettings;
    });
  };

  const applySort = useCallback(
    (lists) => {
      if (!lists) return [];
      return lists.sort((a, b) => {
        let comparison = 0;
        if (settings.sortBy === "alphabetical") {
          comparison = a.name.localeCompare(b.name);
        } else if (settings.sortBy === "updated") {
          comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
        }

        return settings.sortDirection === "descending"
          ? -comparison
          : comparison;
      });
    },
    [settings.sortBy, settings.sortDirection]
  );

  const filteredAndSortedLists = useMemo(() => {
    const filteredLists = shoppingLists
      ? shoppingLists.filter(
          (list) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!settings.showOnlyMine || list.ownerID === user._id)
        )
      : [];

    return applySort(filteredLists);
  }, [shoppingLists, searchTerm, settings, user._id, applySort]);

  const createNewShoppingList = async () => {
    try {
      // Filter empty items
      const filteredItems = newShoppingList.items.filter(
        (item) => item.name.trim() || item.quantity.trim() || item.unit.trim()
      );
      const newList = {
        ...newShoppingList,
        items: filteredItems,
      };

      const data = await api.createShoppingList(token, newList);
      if (data.message) {
        setSuccessMessage(data.message);
        setNewShoppingList({
          ownerID: user._id,
          name: "",
          items: [{ name: "", quantity: "", unit: "" }],
          sharedWith: [],
        });
        setOpenShare(false);
        setShowNewList(false);
        fetchShoppingLists();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const cancelShoppingListEdit = () => {
    setNewShoppingList({
      ownerID: user._id,
      name: "",
      items: [{ name: "", quantity: "", unit: "" }],
      sharedWith: [],
    });
    setOpenShare(false);
    setShowNewList(false);
  };

  return (
    <ShoppingListsCollection
      shoppingLists={filteredAndSortedLists}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showOnlyMine={settings.showOnlyMine}
      setShowOnlyMine={(value) => updateSettings("showOnlyMine", value)}
      sortBy={settings.sortBy}
      setSortBy={(value) => updateSettings("sortBy", value)}
      sortDirection={settings.sortDirection}
      setSortDirection={(value) => updateSettings("sortDirection", value)}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
      showNewList={showNewList}
      setShowNewList={setShowNewList}
      createNewShoppingList={createNewShoppingList}
      newShoppingList={newShoppingList}
      setNewShoppingList={setNewShoppingList}
      openShare={openShare}
      setOpenShare={setOpenShare}
      user={user}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      cancelShoppingListEdit={cancelShoppingListEdit}
    />
  );
};

ShoppingLists.propTypes = {
  user: PropTypes.object,
};

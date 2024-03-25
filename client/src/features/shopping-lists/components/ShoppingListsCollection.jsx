import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  MdClose,
  MdArrowUpward,
  MdArrowDownward,
  MdFilterList,
  MdOutlineFilterListOff,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { NewShoppingList } from "./NewShoppingList";
import { Message } from "../../../components/ui/Message";

export const ShoppingListsCollection = ({
  shoppingLists,
  searchTerm,
  setSearchTerm,
  showOnlyMine,
  setShowOnlyMine,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  showSettings,
  setShowSettings,
  showNewList,
  setShowNewList,
  createNewShoppingList,
  list,
  setList,
  openShare,
  setOpenShare,
  user,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  cancelShoppingListEdit,
}) => {
  const handleRemoveSetting = (settingName) => {
    if (settingName === "showOnlyMine") {
      setShowOnlyMine(false);
    } else if (settingName === "sortBy" || settingName === "sortDirection") {
      setSortBy("");
      setSortDirection("");
    }
  };

  const getSortDirectionText = (direction) => {
    return direction === "ascending" ? "Aufsteigend" : "Absteigend";
  };

  const sortOptionClickHandler = (sortOption) => {
    setSortBy(sortOption);
    if (sortOption !== sortBy) {
      setSortDirection("ascending");
    }
  };

  return (
    <section className="shopping-lists-container">
      <div className="main-content">
        <div className="search-and-controls">
          <div className="search">
            <input
              type="text"
              placeholder="Suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div
            className="filter-icons"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? (
              <MdOutlineFilterListOff className="filter-icon-close" />
            ) : (
              <MdFilterList className="filter-icon-open" />
            )}
          </div>
        </div>
        <div className="active-filters">
          {showOnlyMine && (
            <div className="active-filter">
              <span>Fremde Listen ausblenden</span>
              <MdClose onClick={() => handleRemoveSetting("showOnlyMine")} />
            </div>
          )}
          {sortBy && (
            <div className="active-filter">
              <span>
                Sortierung:{" "}
                {sortBy === "alphabetical" ? "Alphabetisch" : "Neuste"} (
                {getSortDirectionText(sortDirection)})
              </span>
              <MdClose onClick={() => handleRemoveSetting("sortBy")} />
            </div>
          )}
        </div>
        <div className="shopping-list-wrapper">
          {showSettings && (
            <div className="filter-menu">
              <h2>Filter</h2>
              <div className="settings">
                <label className="filter-wrapper">
                  Fremde Listen ausblenden
                  <input
                    type="checkbox"
                    checked={showOnlyMine}
                    onChange={(e) => setShowOnlyMine(e.target.checked)}
                  />
                </label>
              </div>
              <h2>Sortieren</h2>
              <div className="settings">
                <span onClick={() => sortOptionClickHandler("alphabetical")}>
                  Alphabetisch
                </span>
                <div className="arrow-wrapper">
                  <MdArrowUpward
                    className={
                      sortBy === "alphabetical" && sortDirection === "ascending"
                        ? "active-arrow"
                        : ""
                    }
                    onClick={() => {
                      setSortBy("alphabetical");
                      setSortDirection("ascending");
                    }}
                  />
                  <MdArrowDownward
                    className={
                      sortBy === "alphabetical" &&
                      sortDirection === "descending"
                        ? "active-arrow"
                        : ""
                    }
                    onClick={() => {
                      setSortBy("alphabetical");
                      setSortDirection("descending");
                    }}
                  />
                </div>
              </div>

              <div className="settings">
                <span onClick={() => sortOptionClickHandler("updated")}>
                  Neuste
                </span>
                <div className="arrow-wrapper">
                  <MdArrowUpward
                    className={
                      sortBy === "updated" && sortDirection === "ascending"
                        ? "active-arrow"
                        : ""
                    }
                    onClick={() => {
                      setSortBy("updated");
                      setSortDirection("ascending");
                    }}
                  />
                  <MdArrowDownward
                    className={
                      sortBy === "updated" && sortDirection === "descending"
                        ? "active-arrow"
                        : ""
                    }
                    onClick={() => {
                      setSortBy("updated");
                      setSortDirection("descending");
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="single-shopping-list">
            {shoppingLists.length > 0 ? (
              shoppingLists.map((list) => (
                <Link
                  key={list._id}
                  to={`/auth/shopping-lists/${list._id}`}
                  className="item"
                >
                  <p>{list.name}</p>
                  <MdOutlineArrowForwardIos />
                </Link>
              ))
            ) : (
              <p>Keine Einkaufslisten gefunden.</p>
            )}
          </div>
        </div>

        {showNewList ? (
          <div className="new-shopping-list">
            <NewShoppingList
              MdClose={MdClose}
              showNewList={showNewList}
              setShowNewList={setShowNewList}
              createNewShoppingList={createNewShoppingList}
              list={list}
              setList={setList}
              openShare={openShare}
              setOpenShare={setOpenShare}
              user={user}
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              cancelShoppingListEdit={cancelShoppingListEdit}
            />
          </div>
        ) : null}
      </div>

      <div className="footer">
        <Message
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        <button
          className="create-new-list-button"
          onClick={() => setShowNewList(true)}
        >
          Neue Einkaufsliste
        </button>
      </div>
    </section>
  );
};

ShoppingListsCollection.propTypes = {
  shoppingLists: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  showOnlyMine: PropTypes.bool.isRequired,
  setShowOnlyMine: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
  setSortDirection: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
  setShowSettings: PropTypes.func.isRequired,
  showNewList: PropTypes.bool.isRequired,
  setShowNewList: PropTypes.func.isRequired,
  createNewShoppingList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
  openShare: PropTypes.bool.isRequired,
  setOpenShare: PropTypes.func.isRequired,
  user: PropTypes.object,
  successMessage: PropTypes.string.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  cancelShoppingListEdit: PropTypes.func.isRequired,
};

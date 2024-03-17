import PropTypes, { object } from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdFilterList,
  MdOutlineFilterListOff,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export const ShoppingListsCollection = ({
  shoppingLists,
  searchTerm,
  setSearchTerm,
  showOnlyMine,
  setShowOnlyMine,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="shopping-lists-container">
      <div className="wrapper">
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
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <MdOutlineFilterListOff /> : <MdFilterList />}
          </div>
        </div>

        {showFilters && (
          <div className="filter-menu">
            <h2>Filter anwenden</h2>
            <label className="settings">
              <input
                className="checkbox"
                type="checkbox"
                checked={showOnlyMine}
                onChange={() => setShowOnlyMine(!showOnlyMine)}
              />
              Fremde Listen ausblenden
            </label>
          </div>
        )}

        <div className="items">
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
    </section>
  );
};

ShoppingListsCollection.propTypes = {
  shoppingLists: PropTypes.arrayOf(object).isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  showOnlyMine: PropTypes.bool.isRequired,
  setShowOnlyMine: PropTypes.func.isRequired,
};

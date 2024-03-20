import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const NavBarSideMenu = ({ toggleHamburger, isClicked }) => {
  if (!isClicked) {
    return null;
  }

  return (
    <div className="side-menu">
      <ul>
        <li>
          <NavLink to="/#" onClick={toggleHamburger}>
            Kalender
          </NavLink>
        </li>
        <li>
          <NavLink to="/auth/shopping-lists" onClick={toggleHamburger}>
            Einkaufslisten
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={toggleHamburger}>
            ToDo`s
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={toggleHamburger}>
            Inventar
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={toggleHamburger}>
            Checklisten
          </NavLink>
        </li>
        <li>
          <NavLink to="/#" onClick={toggleHamburger}>
            Finanzen
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

NavBarSideMenu.propTypes = {
  toggleHamburger: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

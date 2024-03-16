import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavBarSideMenu = ({ isClicked }) => {
  if (!isClicked) {
    return null;
  }

  return (
    <div className="side-menu">
      <ul>
        <li>
          <NavLink to="/#">Kalender</NavLink>
        </li>
        <li>
          <NavLink to="/#">Einkaufslisten</NavLink>
        </li>
        <li>
          <NavLink to="#">ToDo`s</NavLink>
        </li>
        <li>
          <NavLink to="#">Inventar</NavLink>
        </li>
        <li>
          <NavLink to="#">Checklisten</NavLink>
        </li>
        <li>
          <NavLink to="/#">Finanzen</NavLink>
        </li>
      </ul>
    </div>
  );
};

NavBarSideMenu.propTypes = {
  isClicked: PropTypes.bool.isRequired,
};

export default NavBarSideMenu;

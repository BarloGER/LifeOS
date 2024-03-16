import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

export const NavBarUI = ({ toggleHamburger, isClicked }) => {
  return (
    <nav className="navbar">
      <div className="hamburger">
        {isClicked ? (
          <MdClose onClick={toggleHamburger} />
        ) : (
          <MdMenu onClick={toggleHamburger} />
        )}
      </div>

      <div className="link-wrapper">
        <NavLink to="/auth/dashboard">Dashboard</NavLink>
        <NavLink to="#">Profil</NavLink>
      </div>
    </nav>
  );
};

NavBarUI.propTypes = {
  toggleHamburger: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

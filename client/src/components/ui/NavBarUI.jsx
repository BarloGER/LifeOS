import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  MdMenu,
  MdClose,
  MdMarkunreadMailbox,
  MdOutlineMarkunreadMailbox,
  MdOutlineCheck,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { MessageCenter } from "../../features/message-center";

export const NavBarUI = ({ toggleHamburger, isClicked, user, setUser }) => {
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
        <NavLink to="/auth/user-profile">Profil</NavLink>
        {user ? (
          <MessageCenter
            MdMarkunreadMailbox={MdMarkunreadMailbox}
            MdOutlineMarkunreadMailbox={MdOutlineMarkunreadMailbox}
            MdClose={MdClose}
            MdOutlineCheck={MdOutlineCheck}
            MdKeyboardDoubleArrowUp={MdKeyboardDoubleArrowUp}
            user={user}
            setUser={setUser}
          />
        ) : null}
      </div>
    </nav>
  );
};

NavBarUI.propTypes = {
  toggleHamburger: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func,
};

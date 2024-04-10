import PropTypes from "prop-types";
import { useState } from "react";
import { NavBarUI } from "../components/ui/NavBarUI";
import { NavBarSideMenu } from "../components/ui/NavBarSideMenu";
import "../assets/navbar.css";

export const NavBar = ({ user }) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleHamburger = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <NavBarUI
        toggleHamburger={toggleHamburger}
        isClicked={isClicked}
        user={user}
      />
      <NavBarSideMenu toggleHamburger={toggleHamburger} isClicked={isClicked} />
    </>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
};

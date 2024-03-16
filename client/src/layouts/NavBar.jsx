import { useState } from "react";
import NavBarUI from "../components/ui/NavBarUI";
import NavBarSideMenu from "../components/ui/NavBarSideMenu";
import "../assets/navbar.css";

const NavBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleHamburger = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <NavBarUI toggleHamburger={toggleHamburger} isClicked={isClicked} />
      <NavBarSideMenu isClicked={isClicked} />
    </>
  );
};

export default NavBar;

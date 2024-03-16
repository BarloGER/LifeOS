import { useState } from "react";
import { NavBarUI } from "../components/ui/NavBarUI";
import { NavBarSideMenu } from "../components/ui/NavBarSideMenu";
import "../assets/navbar.css";

export const NavBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleHamburger = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <NavBarUI toggleHamburger={toggleHamburger} isClicked={isClicked} />
      <NavBarSideMenu toggleHamburger={toggleHamburger} isClicked={isClicked} />
    </>
  );
};

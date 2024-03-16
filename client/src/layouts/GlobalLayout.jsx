import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const GlobalLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

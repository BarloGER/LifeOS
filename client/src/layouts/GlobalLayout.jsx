import PropTypes from "prop-types";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";

export const GlobalLayout = ({ isAuthenticated, user }) => {
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location, isAuthenticated]);

  return (
    <>
      <NavBar user={user} />
      <Outlet />
    </>
  );
};

GlobalLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

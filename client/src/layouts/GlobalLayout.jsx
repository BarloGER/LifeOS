import PropTypes from "prop-types";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";

export const GlobalLayout = ({ isAuthenticated, user, setUser }) => {
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location, isAuthenticated]);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Outlet />
    </>
  );
};

GlobalLayout.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
};

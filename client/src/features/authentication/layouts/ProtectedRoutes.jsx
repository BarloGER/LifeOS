import PropTypes from "prop-types";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../../components/ui/LoadingSceen";

// ToDo: Add Loading Screen

export const ProtectedRoutes = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : <LoadingScreen />;
};

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

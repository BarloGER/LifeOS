import PropTypes from "prop-types";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../../components/ui/LoadingSceen";

export const ProtectedRoutes = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return isAuthenticated ? <Outlet /> : <LoadingScreen />;
};

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

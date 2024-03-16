import PropTypes from "prop-types";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ isAuthenticated, loadingAuthRequest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuthRequest && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loadingAuthRequest, navigate]);

  return isAuthenticated ? <Outlet /> : <h1>Loading...</h1>;
};

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loadingAuthRequest: PropTypes.bool.isRequired,
};

export default ProtectedRoutes;

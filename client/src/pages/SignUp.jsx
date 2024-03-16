import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignUpForm } from "../features/authentication";
import { api } from "../lib/apiFacade";
import "../features/authentication/assets/auth-forms.css";

export const SignUp = ({
  isAuthenticated,
  setIsAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
  setToken,
}) => {
  const [{ username, email, password, confirm_password }, setFormState] =
    useState({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadingAuthRequest(true);

      if (password !== confirm_password) {
        setLoadingAuthRequest(false);
        return;
      }

      const data = await api.signUp({
        username,
        email,
        password,
      });

      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
      setErrorMessage(error.message);
    }
  };

  if (isAuthenticated) return <Navigate to="/auth/dashboard" />;

  return (
    <SignUpForm
      username={username}
      email={email}
      password={password}
      confirm_password={confirm_password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loadingAuthRequest={loadingAuthRequest}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  loadingAuthRequest: PropTypes.bool.isRequired,
  setLoadingAuthRequest: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

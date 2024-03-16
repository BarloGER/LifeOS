import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignInForm } from "../features/authentication";
import { api } from "../lib/apiFacade";
import "../features/authentication/assets/auth-forms.css";

export const SignIn = ({
  setToken,
  isAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  const [{ email, password }, setFormState] = useState({
    email: "",
    password: "",
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
      const data = await api.signIn({ email, password });
      setToken(data.token);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
      setErrorMessage(error.message);
    }
  };

  if (isAuthenticated) return <Navigate to="/auth/dashboard" />;

  return (
    <SignInForm
      email={email}
      password={password}
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

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadingAuthRequest: PropTypes.bool.isRequired,
  setLoadingAuthRequest: PropTypes.func.isRequired,
};

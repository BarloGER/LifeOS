import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Message } from "../../../components/ui/Message";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

export const SignInForm = ({
  email,
  password,
  handleChange,
  handleSubmit,
  loadingAuthRequest,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <section className="auth-container">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Anmelden</h3>
        <div className="input-wrapper">
          <input
            className="input"
            id="email"
            type="email"
            placeholder="E-Mail Adresse"
            value={email}
            onChange={handleChange}
          />

          <input
            className="input"
            id="password"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Anmelden {loadingAuthRequest && <LoadingSpinner />}
        </button>

        <Message
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </form>

      <div className="switch-page">
        <p className="text">Noch nicht registriert?</p>

        <Link to="sign-up">
          <button className="switch-button">SignUp</button>
        </Link>
      </div>
    </section>
  );
};

SignInForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loadingAuthRequest: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
  setSuccessMessage: PropTypes.func,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
};

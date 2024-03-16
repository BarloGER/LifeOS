import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Message } from "../../../components/ui/Message";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

export const SignUpForm = ({
  username,
  email,
  password,
  confirm_password,
  handleSubmit,
  handleChange,
  loadingAuthRequest,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <section className="auth-container">
      <form onSubmit={handleSubmit}>
        <h1 className="title">Registrieren</h1>
        <div className="input-wrapper">
          <input
            className="input"
            id="username"
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={handleChange}
          />

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

          <input
            className="input"
            id="confirm_password"
            type="password"
            placeholder="Passwort wiederholen"
            value={confirm_password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Registrieren {loadingAuthRequest && <LoadingSpinner />}
        </button>

        <Message
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </form>

      <div className="switch-page">
        <p className="text">Bereits registriert?</p>

        <Link to="/">
          <button className="switch-button">SignIn</button>
        </Link>
      </div>
    </section>
  );
};

SignUpForm.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirm_password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loadingAuthRequest: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
  setSuccessMessage: PropTypes.func,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
};

import PropTypes from "prop-types";
import { useState } from "react";
import { Message } from "../../components/ui/Message";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { LoadingScreen } from "../ui/LoadingSceen";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/user-profile.css";

export const UserProfileForm = ({
  user,
  handleInputChange,
  handleEditSubmit,
  deleteAccount,
  logOut,
  isEditing,
  setIsEditing,
  editedUser,
  setEditedUser,
  isEditingPassword,
  setIsEditingPassword,
  handlePasswordChange,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  isLoading,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [deletionRequest, setDeletionRequest] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return user ? (
    <div className="profile-container">
      {" "}
      <div className="profile-box">
        {" "}
        <h1>Willkommen zurück, {editedUser.username}</h1>
        <Message
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <div className="profile-data-wrapper">
              <div className="profile-input-wrapper">
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="profile-input-wrapper">
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            {isEditingPassword && (
              <div className="profile-data-wrapper">
                <div className="profile-input-wrapper">
                  <label>
                    Neues Passwort:
                    <div className="input-icon-container">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={editedUser.password}
                        onChange={handleInputChange}
                      />
                      {isPasswordVisible ? (
                        <FaEyeSlash
                          className="input-icon-2 fa-eye"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaEye
                          className="input-icon-2 fa-eye"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </label>
                </div>
                <div className="profile-input-wrapper">
                  <label>
                    Passwort wiederholen:
                    <div className="input-icon-container">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="repeatPassword"
                        onChange={handlePasswordChange}
                      />
                      {isPasswordVisible ? (
                        <FaEyeSlash
                          className="input-icon-2 fa-eye"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaEye
                          className="input-icon-2 fa-eye"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className="profile-button-wrapper">
              <button
                type="button"
                onClick={() => setIsEditingPassword(!isEditingPassword)}
              >
                Passwort bearbeiten
              </button>
              <button type="submit" className="submit-button">
                Änderungen speichern {isLoading && <LoadingSpinner />}
              </button>
              <button
                className="abort-button"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setIsEditingPassword(false);
                  setEditedUser({
                    email: user.email,
                    username: user.username,
                    password: "",
                  });
                }}
              >
                Abbrechen
              </button>
            </div>
          </form>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              Profil bearbeiten
            </button>
            <button onClick={logOut}>Logout</button>
            <button
              className="delete-account-button"
              onClick={() => setDeletionRequest(true)}
            >
              Account löschen
            </button>
            {deletionRequest ? (
              <div>
                <span>Account wirklich löschen?</span>
                <div className="profile-button-wrapper">
                  <button onClick={() => setDeletionRequest(false)}>
                    Abbrechen
                  </button>
                  <button
                    className="delete-account-button"
                    onClick={() => deleteAccount()}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  ) : (
    <LoadingScreen />
  );
};

UserProfileForm.propTypes = {
  user: PropTypes.object,
  handleInputChange: PropTypes.func.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  editedUser: PropTypes.object.isRequired,
  setEditedUser: PropTypes.func.isRequired,
  isEditingPassword: PropTypes.bool.isRequired,
  setIsEditingPassword: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

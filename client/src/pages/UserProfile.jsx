import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { UserProfileForm } from "../components/forms/UserProfileForm";
import { api } from "../lib/apiFacade";

export const UserProfile = ({ user, setUser, setIsAuthenticated }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [friendUsername, setFriendUsername] = useState("");
  const [editedUser, setEditedUser] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        username: user.username,
        email: user.email,
        password: "",
        repeatPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editedUser.password !== editedUser.repeatPassword) {
      setErrorMessage("Die Passwörter stimmen nicht überein.");
      setPasswordsMatch(false);
      return;
    }

    setErrorMessage("");
    setPasswordsMatch(true);
    setIsLoading(true);

    try {
      const userData = { ...editedUser };
      delete userData.repeatPassword;

      const data = await api.editUser(token, userData);
      if (data.message) {
        setSuccessMessage(data.message);
        setUser((prevUser) => ({
          ...prevUser,
          username: editedUser.username,
          email: editedUser.email,
        }));
        setIsEditingPassword(false);
        setIsEditing(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendFriendRequests = async (friendUsername) => {
    const friendUsernameToObj = {
      username: friendUsername,
    };

    try {
      const friend = await api.getUserByUsername(token, friendUsernameToObj);
      if (!friend) {
        setErrorMessage(friend.message);
        return;
      }

      const friendData = {
        username: user.username,
        friendID: friend._id,
        friendUsername,
      };
      const sendRequest = await api.sendFriendRequest(token, friendData);
      if (sendRequest.message) {
        setSuccessMessage(sendRequest.message);
        setFriendUsername("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastPath");
    localStorage.removeItem("shopping-list-settings");
    setIsAuthenticated(false);
  };

  const deleteAccount = async () => {
    try {
      const data = await api.deleteUser(token);

      if (data.message) {
        localStorage.clear();
        setIsAuthenticated(false);
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <UserProfileForm
      user={user}
      handleInputChange={handleInputChange}
      handleEditSubmit={handleEditSubmit}
      deleteAccount={deleteAccount}
      logOut={logOut}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      isEditingPassword={isEditingPassword}
      setIsEditingPassword={setIsEditingPassword}
      passwordsMatch={passwordsMatch}
      setPasswordsMatch={setPasswordsMatch}
      handlePasswordChange={handlePasswordChange}
      editedUser={editedUser}
      setEditedUser={setEditedUser}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      isLoading={isLoading}
      sendFriendRequests={sendFriendRequests}
      friendUsername={friendUsername}
      setFriendUsername={setFriendUsername}
    />
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setIsAuthenticated: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { api } from "../lib/apiFacade";
import { MessageList } from "../features/message-center/components/MessageList";

export const MessageCenter = ({
  MdMarkunreadMailbox,
  MdOutlineMarkunreadMailbox,
  MdClose,
  MdOutlineCheck,
  MdKeyboardDoubleArrowUp,
  user,
  setUser,
}) => {
  const [messages, setMessages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && user.messages) {
      const processedMessages = user.messages.flatMap((message) =>
        message.friendRequestFrom.map((request) => ({
          ...request,
          type: "friendRequest",
        }))
      );
      setMessages(processedMessages);
    }
  }, [user]);

  const messageCount = messages.length;

  const acceptFriendRequest = async (username, friendID, friendUsername) => {
    const acceptData = { username, friendID, friendUsername };
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = await api.acceptFriendRequest(token, acceptData);

      if (data.message) {
        setSuccessMessage(data.message);
        setMessages((currentMessages) =>
          currentMessages.filter((message) => message.friendID !== friendID)
        );

        setUser((currentUser) => {
          const updatedFriends = [
            ...currentUser.friends,
            { friendID, friendUsername },
          ];

          const updatedMessages = currentUser.messages.flatMap((message) =>
            message.friendRequestFrom.filter(
              (request) => request.friendID !== friendID
            )
          );

          return {
            ...currentUser,
            friends: updatedFriends,
            messages: [
              {
                ...currentUser.messages[0],
                friendRequestFrom: updatedMessages,
              },
            ],
          };
        });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const rejectFriendRequest = async (friendID, friendUsername) => {
    const rejectData = { friendID, friendUsername };
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = await api.rejectFriendRequest(token, rejectData);

      if (data.message) {
        setSuccessMessage(data.message);
        setMessages((currentMessages) =>
          currentMessages.filter((message) => message.friendID !== friendID)
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <MessageList
      user={user}
      acceptFriendRequest={acceptFriendRequest}
      rejectFriendRequest={rejectFriendRequest}
      messageCount={messageCount}
      messages={messages}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      MdClose={MdClose}
      MdOutlineCheck={MdOutlineCheck}
      MdMarkunreadMailbox={MdMarkunreadMailbox}
      MdKeyboardDoubleArrowUp={MdKeyboardDoubleArrowUp}
      MdOutlineMarkunreadMailbox={MdOutlineMarkunreadMailbox}
    />
  );
};

MessageCenter.propTypes = {
  MdMarkunreadMailbox: PropTypes.func.isRequired,
  MdOutlineMarkunreadMailbox: PropTypes.func.isRequired,
  MdKeyboardDoubleArrowUp: PropTypes.func.isRequired,
  MdClose: PropTypes.func.isRequired,
  MdOutlineCheck: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func,
};

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../lib/apiFacade";
import { Message } from "../../../components/ui/Message";
import "../assets/message-center.css";

export const MessageCenter = ({
  MdMarkunreadMailbox,
  MdOutlineMarkunreadMailbox,
  MdClose,
  MdOutlineCheck,
  MdKeyboardDoubleArrowUp,
  user,
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
    <>
      <Link
        to="#"
        className={messageCount > 0 ? "inbox filled" : "inbox empty"}
        data-count={messageCount}
        onClick={() => setIsClicked(!isClicked)}
      >
        {messageCount > 0 ? (
          <MdMarkunreadMailbox className="inbox-icon filled" />
        ) : (
          <MdOutlineMarkunreadMailbox className="inbox-icon empty" />
        )}
      </Link>

      {isClicked && (
        <div className="message-center">
          <div className="message-container">
            {messages.length === 0 ? (
              <p>Keine Benachrichtigungen</p>
            ) : (
              messages.map((message, index) => (
                <div key={index} className="messages">
                  {message.type === "friendRequest" && (
                    <div className="friend-message">
                      <div>
                        <span>{message.friendUsername}</span>
                      </div>
                      <div className="friend-messages-buttons">
                        <MdOutlineCheck
                          className="accept-friend-request"
                          onClick={() =>
                            acceptFriendRequest(
                              user.username,
                              message.friendID,
                              message.friendUsername
                            )
                          }
                        />
                        <MdClose
                          className="reject-friend-request"
                          onClick={() =>
                            rejectFriendRequest(
                              message.friendID,
                              message.friendUsername
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                  {/* More message types */}
                </div>
              ))
            )}
            <Message
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </div>
          <MdKeyboardDoubleArrowUp
            className="close-message-center"
            onClick={() => setIsClicked(false)}
          />
        </div>
      )}
    </>
  );
};

MessageCenter.propTypes = {
  MdMarkunreadMailbox: PropTypes.func.isRequired,
  MdOutlineMarkunreadMailbox: PropTypes.func.isRequired,
  MdKeyboardDoubleArrowUp: PropTypes.func.isRequired,
  MdClose: PropTypes.func.isRequired,
  MdOutlineCheck: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Message } from "../../../components/ui/Message";
import "../assets/message-list.css";

export const MessageList = ({
  user,
  acceptFriendRequest,
  rejectFriendRequest,
  messageCount,
  messages,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  isClicked,
  setIsClicked,
  MdClose,
  MdOutlineCheck,
  MdMarkunreadMailbox,
  MdKeyboardDoubleArrowUp,
  MdOutlineMarkunreadMailbox,
}) => {
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

MessageList.propTypes = {
  user: PropTypes.object,
  acceptFriendRequest: PropTypes.func.isRequired,
  rejectFriendRequest: PropTypes.func.isRequired,
  messageCount: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  setIsClicked: PropTypes.func.isRequired,
  MdClose: PropTypes.func.isRequired,
  MdOutlineCheck: PropTypes.func.isRequired,
  MdMarkunreadMailbox: PropTypes.func.isRequired,
  MdKeyboardDoubleArrowUp: PropTypes.func.isRequired,
  MdOutlineMarkunreadMailbox: PropTypes.func.isRequired,
};

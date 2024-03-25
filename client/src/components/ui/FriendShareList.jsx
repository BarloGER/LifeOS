import PropTypes from "prop-types";

export const FriendShareList = ({
  openShare,
  friends,
  sharedWith,
  setFeatureState,
}) => {
  if (!openShare) {
    return null;
  }

  // setFeatureState is the main feature state like setList for the ShoppingLists feature
  const handleFriendCheckboxChange = (friend, isChecked) => {
    setFeatureState((prev) => {
      if (isChecked) {
        return {
          ...prev,
          sharedWith: [
            ...prev.sharedWith,
            {
              friendID: friend.friendID,
              friendUsername: friend.friendUsername,
            },
          ],
        };
      } else {
        return {
          ...prev,
          sharedWith: prev.sharedWith.filter(
            (f) => f.friendID !== friend.friendID
          ),
        };
      }
    });
  };

  if (friends.length === 0) {
    return (
      <div className="friend-wrapper">Noch keine Freunde hinzugefügt.</div>
    );
  }

  return (
    <div className="share-with-friends-container">
      {friends.map((friend, index) => (
        <div key={index}>
          <span>{friend.friendUsername} </span>
          <input
            type="checkbox"
            onChange={(e) =>
              handleFriendCheckboxChange(friend, e.target.checked)
            }
            checked={sharedWith.some((f) => f.friendID === friend.friendID)}
          />
        </div>
      ))}
    </div>
  );
};

FriendShareList.propTypes = {
  openShare: PropTypes.bool.isRequired,
  friends: PropTypes.array.isRequired,
  sharedWith: PropTypes.array.isRequired,
  setFeatureState: PropTypes.func.isRequired,
};

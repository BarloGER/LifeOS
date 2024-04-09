import PropTypes from "prop-types";
import "../../assets/friend-share-list.css";

// ToDo: Verhindern dass Nicht befreundete Personen, aus der Liste verschwinden, wenn die checkbox angeklickt wird.

export const FriendShareList = ({
  openShare,
  friends,
  sharedWith,
  setFeatureState,
}) => {
  if (!openShare) {
    return null;
  }

  const combinedList = friends.map((friend) => ({
    ...friend,
    isFriend: true,
  }));

  sharedWith.forEach((person) => {
    if (!combinedList.some((friend) => friend.friendID === person.friendID)) {
      combinedList.push({
        ...person,
        isFriend: false,
      });
    }
  });

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
      {combinedList.map((person, index) => (
        <div key={index}>
          <span className={person.isFriend ? "friend" : "non-friends"}>
            {person.friendUsername}
          </span>
          <input
            type="checkbox"
            onChange={(e) =>
              handleFriendCheckboxChange(person, e.target.checked)
            }
            checked={sharedWith.some((f) => f.friendID === person.friendID)}
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

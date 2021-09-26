import { Link } from "react-router-dom";
import "./friendClose.css";

const FriendClose = ({friendItem}) => {
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${friendItem.username}`}
            className="sideBarFriendLink">
        <img
          className="sidebarFriendImg"
          src={friendItem?.profilePicture}
          alt=""
        />
        <span className="sidebarFriendName">{friendItem?.username}</span>
      </Link>
    </li>
  );
};

export default FriendClose;

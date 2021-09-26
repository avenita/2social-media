import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";

const RightProfile = ({user, currentUser, friends, handleClick, followed}) => {
    // console.log(user);
    // console.log(followed);
    // console.log(user);
    // console.log(currentUser);
    
    return(
        <>
            {
                user.username !== currentUser.username && (
                    <button className="rigthFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"} 
                        {followed ? <Remove/> : <Add/> } 
                        
                    </button>
                )
            }
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user?.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user?.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">
                        {user.relationship === 1 ? 'solter@' : user.relationship === 2 ? 'Prometid@' : 'Casad@'}
                    </span>
                </div>
            </div>
            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
                {
                    friends.length > 0 
                        ? friends.map((friend) => (
                            <div key={friend._id} className="rightbarFollowing">
                                <Link to={`/profile/${friend.username}`} style={{color:'rebeccapurple'}}>
                                    <img 
                                        src={friend.profilePicture} 
                                        alt="" 
                                        className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">
                                        {friend.username}
                                    </span>
                                </Link>
                            </div>
                        ))
                        : 'No friends'
                }

                {
                    friends.length >= 6 &&
                        <Link to={`/${user.username}/friends`}
                            className="rightbarFollowingsLink">
                            ver Lista
                        </Link>
                }

            </div>
        </>
    );
}

export default RightProfile;
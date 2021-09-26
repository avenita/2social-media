import { useEffect, useState } from "react";
import { API_URL, IMG_PERSON_SERVER } from "../../conf";
import { getFriends, getFriendsUser, getTwoConversation } from "../../services/user.services";
import "./chatOnline.css"

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriendsData = async () => {
            const res = await getFriendsUser(`${API_URL}/users/friends/${currentId}`);
            if(res.error) return
            // console.log('friends',res)
            setFriends(res.docs);
        }
        getFriendsData();
    }, [currentId]);


    useEffect(() => {
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)) || [])
    }, [friends, onlineUsers]);


    const handleClick = async (user) => {
        console.log( user.username);
        try {
            const res = await getTwoConversation(`${API_URL}/conversations/find/${currentId}/${user._id}`);
            console.log('get two conversa', res);
            setCurrentChat(res);
        } 
        catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="chatOnline-container">
            {
                onlineFriends.map((o, i) => (
                    <div key={i} className="chatOnlineFriend" onClick={() => handleClick(o)}>
                        <div className="chatOnlineImgContainer">
                            <img 
                                className="chatOnlineImg" 
                                src={o.profilePicture ? o.profilePicture : IMG_PERSON_SERVER+'noAvatar.png'} 
                                alt="" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">
                            {o.username}
                        </span>
                    </div>
                ))
            }
        </div>
     );
}
 
export default ChatOnline;
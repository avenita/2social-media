import { useEffect, useState } from 'react';
import './conversation.css'

import {getUser} from '../../services/user.services'
import { API_URL, IMG_PERSON_SERVER } from '../../conf';

const Conversation = ({conversation, currentUser}) => {
    // console.log('conversation ',conversation)
    
    const [user, setUser] = useState(null);


    useEffect(() => {
        const friendId = conversation.members.find(m => 
                m !== currentUser._id
        )

        const getUserDate = async () => {
            const res = await getUser(`${API_URL}/users/users?userId=${friendId}`) 
            // console.log(res);
            setUser(res)
        }
        getUserDate();
    }, [currentUser, conversation]);


    return(
        <div className="conversation-container">
            <img 
                src={
                    user?.profilePicture 
                        ? user.profilePicture
                        : IMG_PERSON_SERVER+'noAvatar.png'
                } 
                alt="" 
                className="conversationImg"/>
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}

export default Conversation;
import { useEffect, useState } from 'react';
import {format} from 'timeago.js'
import { API_URL } from '../../conf';
import { getUser } from '../../services/user.services';
import './message.css'

const Message = ({own, message, userId}) => {
    // console.log('message item',message)

        
    const [user, setUser] = useState(null);


    useEffect(() => {

        const getUserDate = async () => {
            const res = await getUser(`${API_URL}/users/users?userId=${userId}`) 
            // console.log(res);
            setUser(res)
        }
        getUserDate();
    }, []);


    return ( 
        <div className={own ? "message-container own" : "message-container"}>
            <div className="messageTop">
                <img
                    className="messageImg" 
                    src={user?.profilePicture} 
                    alt="" />
                <p className={own ? "messageText own" : "messageText"}>
                    {message?.text}
                </p>
            </div>
            <div className="messageBottom">{format(message?.createdAt)}</div>
        </div>
     );
}
 
export default Message;
import './rightbar.css'

//importando datos falsos
// import {Users as usersDate} from '../../data/dummyData'
import { API_URL} from '../../conf';
import { useEffect, useState } from 'react';
import { followUser, getFriendsUser, unFollowUser } from '../../services/user.services';
import { FOLLOW, UNFOLLOW } from '../../context/authTypes';
import RightProfile  from '../right-profile/RightProfile';
import RightHome from '../right-home/RightHome';
import { useSelector } from 'react-redux';

const Rightbar = ({user}) => {
    const [friends, setFriends] = useState([]);
    // const {user: currentUser, dispatch} = useContext(AuthContext);
    const dispatch = null; //mientras tanto
    const currentUser = useSelector(store => store.user.user)
    const [followed, setFollowed] = useState(null);
    // const [followed, setFollowed] = useState(
    //     // currentUser.followings &&
    //     // currentUser.followings.includes(user?._id)
    // );

    
    
    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await getFriendsUser(`${API_URL}/users/friends/${user?._id}`);
                console.log('friends',res);
                if(res.error) return
                setFriends(res?.docs.slice(0, 6))
            } catch (error) {
                console.error(error.message);
                return                
            }
        } 
        getFriends();

        setFollowed(
            user?.followers &&
                user?.followers?.includes(currentUser?._id)
        );

    }, [user]);

    const handleClick = async (e) => {
        console.log(followed)
        try {
            if(followed){
                const res = await unFollowUser(`${API_URL}/users/${user._id}/unfollow`,{userId: currentUser._id});
                // console.log(res);
                dispatch({type: UNFOLLOW, payload: user._id})
            }else{
                const res = await followUser(`${API_URL}/users/${user._id}/follow`, {userId: currentUser._id});
                // console.log(res);
                dispatch({type: FOLLOW, payload: user._id})
            }
        } catch (error) {
            console.log(error)   
        }
        setFollowed(!followed);
    }


    return ( 
        <div className="rightbar-container">
            <div className="rigthbarWrapper">
                {
                    user 
                        ? <RightProfile 
                                user={user} 
                                currentUser={currentUser} 
                                friends={friends} 
                                handleClick={handleClick} 
                                followed={followed}/>
                        : <RightHome/>
                }                
            </div>
        </div>
     );
}
 
export default Rightbar;
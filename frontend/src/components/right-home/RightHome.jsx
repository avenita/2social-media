import { useParams } from 'react-router-dom';
import { API_URL, IMG_PUBLIC } from '../../conf';
import {Users as usersDate} from '../../data/dummyData'
import FriendOnline from '../friend-online/FriendOnline';


const RightHome = () => {

    const {username: searchUsername} = useParams()



    return(
        <>
            <div className="birthdayContainer">
                <img className="birthdayImg" src={`${IMG_PUBLIC}/gift.png`} alt="" />
                <span className="birthdayText">
                    <b>Paola Foster</b> And <b>3 other friends</b> hav a birthdaay today
                </span>

            </div>
            <img className="rightbarAd" src={`${IMG_PUBLIC}/ad.png`} alt="" />
            {
                !searchUsername &&
                <> 
                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightFriendList">
                        {
                                usersDate.map(user => <FriendOnline key={user.id} user={user}/>)
                        }
                    </ul> 
                </>
            }
        </>
    )
}

export default RightHome;
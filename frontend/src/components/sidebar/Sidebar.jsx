//importando components
import {RssFeed, HelpOutline, WorkOutline, Event, School, Bookmark, Chat, PlayCircleFilledWhiteOutlined, Group} from '@material-ui/icons'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../conf';

//importando datos falsos
import {Users as usersDate} from '../../data/dummyData'
import { getFriendsUser } from '../../services/user.services';
import FriendClose from '../friend-close/FriendClose';

//importando stilos
import './sidebar.css'

const INITIAL_PAGE = 1;

const Sidebar = () => {

    const { user } = useSelector(store => store.user);
    const [friends, setFriends] = useState([]);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [nextPage, setNextPage] = useState(false);

    useEffect(() => {
        const getFriendData = async () => {
            const res = await getFriendsUser(`${API_URL}/users/friends/${user._id}?page=1&limite=${5}`);
            if(res.error) return;
            setFriends(res.docs);
            setNextPage(res.next)
        }
        getFriendData();
    }, []);


    useEffect(() => {
        const getData = async () => {
            if (page > 1 && nextPage) {
                const getFriendData = async () => {
                    const res = await getFriendsUser(`${API_URL}/users/friends/${user._id}?page=${page}&limite=5`);
                    if(res.error) return;
                    setFriends([...friends, ...res.docs]);
                    setNextPage(res.next)
                }
                getFriendData();
            }else{
                return   
            }
        }
        getData();
    }, [page]);

    return ( 
        <div className="sidebar-container">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledWhiteOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
            </div>
            
            <button className="sidebarButton">
                Show More
            </button>

            <hr className="sidebarHr" />

            <ul className="sidebarListFriend">
                {
                    friends?.map(friend => <FriendClose 
                                                key={friend._id + Date.now()} 
                                                friendItem={friend}/>)
                }
            </ul>
            {
                nextPage &&
                    <button
                        onClick={() => setPage(prePag => prePag + 1)} 
                        className="sideBarNextPage"> 
                        More Friends 
                    </button>
            }
        </div>
     );
}
 
export default Sidebar;
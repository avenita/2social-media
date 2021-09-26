//importando components
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TopBar from '../../components/topbar/Topbar'
import { API_URL, IMG_PERSON_SERVER, IMG_POST_SERVER } from '../../conf'
import { getUser } from '../../services/user.services'
import { Edit } from '@material-ui/icons'

//importando stilos
import './profile.css'
import '../../components/profile-cover/profileCover.css'
import ProfileEditImg from '../../components/profileImg-edit/ProfileEditImg.jsx'
import { useSelector } from 'react-redux'

export default function Profile() {
    const [imgUrl, setImgUrl] = useState(null);
    const [user, setUser] = useState({});
    const { username } = useParams();
    const { user:currentUser } = useSelector(store => store.user);

    useEffect(() => {
        const getData = async () => {
            let res = await getUser(`${API_URL}/users/users?username=${username}`);
            // console.log('profile', res);
            setUser(res)
        }
        getData();

    }, [username, currentUser]);

    const handleImgUrl = (url, pathUrl) => {
        // console.log(url, pathUrl)
        setImgUrl({
            url,
            pathUrl
        });
    }

    return (
        <>
            <TopBar />
            <section className="profile-container">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">

                        <div className="profileCover">
                            <div className="profileCoverImgContainer">
                                <img
                                    className="profileCoverImg"
                                    src={
                                        user.coverPicture
                                            ? user.coverPicture
                                            : IMG_POST_SERVER + 'noCover.png'
                                    }
                                    alt="" />
                                    {
                                        user._id === currentUser._id &&
                                            <Edit
                                                className="profileCoverIcon cov"
                                                onClick={() =>
                                                    handleImgUrl(user.coverPicture
                                                        || IMG_POST_SERVER + "noCover.png",
                                                        'coverPicture')}
                                            />
                                    }
                            </div>
                            <div className="profileCoverImgContainer">
                                <img
                                    className="profileUserImg"
                                    src={
                                        user.profilePicture
                                            ? user.profilePicture
                                            : IMG_PERSON_SERVER + 'noAvatar.png'
                                    }
                                    alt="" />
                                    {
                                        user._id === currentUser._id &&
                                                    <Edit
                                                        className="profileCoverIcon pro"
                                                        onClick={() =>
                                                        handleImgUrl(user.profilePicture
                                                            || IMG_PERSON_SERVER + 'noAvatar.png',
                                                            'profilePicture')}
                                                    />
                                    }
                            </div>
                        </div>


                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username} />
                        {
                            user &&
                            <Rightbar user={user} />
                        }
                    </div>
                </div>
            </section>

            {
                imgUrl &&
                    <ProfileEditImg 
                        user={user}
                        imgUrl={imgUrl} 
                        setImgUrl={setImgUrl} />
            }
        </>
    );
}


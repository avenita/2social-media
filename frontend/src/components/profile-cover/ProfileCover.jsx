import { Edit, Cancel } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IMG_POST_SERVER, IMG_PERSON_SERVER } from '../../conf';
import './profileCover.css'



const ProfilePicture = ({ user , handleImgUrl}) => {

    const {user: userCurrent } = useSelector(store => store.user)
    const [urlCover, setUrlCover] = useState(null);
    const [urlProfile, setUrlProfile] = useState(null);

    useEffect(() => {
        setUrlCover(
            user.coverPicture
                ? user.coverPicture
                : IMG_POST_SERVER + 'noCover.png'
        )
        setUrlProfile(
            user.profilePicture
                ? user.profilePicture
                : IMG_PERSON_SERVER + 'noAvatar.png'
        )
    }, [userCurrent]);

    return (
        <div className="profileCover">
            <div className="profileCoverImgContainer">
                <img
                    className="profileCoverImg"
                    src={urlCover}
                    alt="" />
                <Edit
                    className="profileCoverIcon cov"
                    onClick={() =>
                        handleImgUrl(user.coverPicture
                            || IMG_POST_SERVER + "noCover.png",
                            'coverPicture')}
                />
            </div>
            <div className="profileCoverImgContainer">
                <img
                    className="profileUserImg"
                    src={urlProfile}
                    alt="" />
                <Edit
                    className="profileCoverIcon pro"
                    onClick={() =>
                        handleImgUrl(user.profilePicture
                            || IMG_PERSON_SERVER + 'noAvatar.png',
                            'profilePicture')}
                />
            </div>
        </div>

    )
}

export default ProfilePicture;

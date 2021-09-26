import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../conf';
import { findUsersFetch } from '../../services/user.services';
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined} from '@material-ui/icons' 

import './findUsersResult.css'
import { useSelector } from 'react-redux';

const FindUsersResult = () => {

    const {username} = useParams();
    const [findUsers, setFindUsers] = useState([]);
    const [numberPage, setNumberPage] = useState(1);
    const [hasNextPag, setHasNextPag] = useState(false);    
    const [hasPrevPag, setHasPrevPag] = useState(false);   
    const {_id : currentUserId} = useSelector(store => store.user.user);

    useEffect( () => {
        
        const getFindUsersData = async () => {
            const res = await findUsersFetch(`${API_URL}/users/findUsers?limit=10&page=${numberPage}`, {username});
            const {users: resultFind, hasNextPage, hasPrevPage} = res;
            // console.log(res);
            setFindUsers(resultFind);
            setHasNextPag(hasNextPage)
            setHasPrevPag(hasPrevPage)
        }

        getFindUsersData();

        document.querySelector('.searchInput').value= username;

    },[username, numberPage])


    return (
        <div className="findResult">
            {
                findUsers.length === 0
                    ? <p className="findResult-not">
                           No hay resultados sobre la busqueda de <i> '{username}' </i>
                      </p>
                    
                    : <div className="resultContainer">
                            {
                                findUsers.map( (us,i) => (
                                    <div key={i} className="resultItem" >
                                        <div className="resultItemTop">
                                            <div className="resultItemTopLeft">
                                                <Link to={`/profile/${us.username}`}>
                                                    <img className="resultItemImg" src={us.profilePicture} alt="" />
                                                </Link>
                                            </div>
                                            <div className="resultItemTopRight">
                                                <Link to={`/profile/${us.username}`}
                                                    style={{color: 'slateblue'}}>
                                                    <p className="resultItemName">{us.username}</p>
                                                </Link>
                                                <p className="resultItemDat">
                                                    {
                                                        us.from !== undefined &&
                                                        <span> 
                                                            <b className="b">From</b> {us.from} 
                                                        </span>
                                                    }
                                                    {
                                                        us.city !== undefined &&
                                                        <span>
                                                            <b className="b">City</b> {us.city} 
                                                        </span>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="resultItemBottom">
                                            <p className="resultItemEmail"> <b className="b">Email</b> {us.email}</p>
                                            <p className="resultItemFriends"> <b className="b">Amigos</b> {us.followings.length || 0}</p>
                                        </div>
                                        {
                                            us?.followers.includes(currentUserId) &&
                                                <div className="resultItemIsFriend">
                                                    Friends
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                      </div> 
            }
            
            {
                (hasNextPag || hasPrevPag) &&
                    <div className="findPaginateContainer">
                        <KeyboardArrowLeftOutlined
                            onClick={() => setNumberPage(numberPage > 1 ? numberPage - 1 : 1)} 
                            className="findArrow"/>
                        <span className="findNumberPag">
                            {numberPage}
                        </span>
                        <KeyboardArrowRightOutlined
                            onClick={() => hasNextPag && setNumberPage(numberPage + 1)} 
                            className="findArrow"/>
                    </div>
            }

        </div> 
    )
}

export default FindUsersResult;
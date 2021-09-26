import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { API_URL } from "../../conf";
import { logout } from '../../services/auth.services'
import { userActions } from "../../store/actions";

import "./topbar.css";

const Topbar = () => {

    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const username = useRef();
    const history = useHistory();

    const handleLogout = async e => {
        e.preventDefault();
        try {
            const res = await logout(`${API_URL}/auth/signout`);
            if (res.error) throw Error(res.error)
            window.localStorage.removeItem('token');
            dispatch(userActions.logout())
        } 
        catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('submit');
        if(username.current.value === '') return ;

        // console.log(username.current.value);
        history.push({pathname: `/findUsers/${username.current.value}` })

    }


    return (
        <div className="topbar-container">

            <div className="topbarLeft">
                <Link to="/">
                    <span className="topbarLogo">MatrixSocial</span>
                </Link>
            </div>

            <div className="topbarCenter">
                <form className="searchbar"
                    onSubmit={handleSearch} >
                    <Search className="searchIcon" />
                    <input 
                        className="searchInput" 
                        autoComplete="off"
                        ref={username}
                        placeholder="Search for friend, post pr video" 
                        type="text" />
                </form>
            </div>

            <div className="topbarRigth">
                <div className="topbarLinks">
                    <span className="topbarLink">Timeline</span>
                    <span className="topbarLink">HomePage</span> 
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>

                <div className="topbarProfileOtionsContainer">
                    <Link to={`/profile/${user.username}`} id="ver">
                        <img
                            src={user.profilePicture}
                            alt="profile"
                            className="topbarProfileImg" />
                    </Link> 

                    <div className="topbarProfileOptions">
                        <ul className="topbarMenuConfg">
                            <Link to={`/profile/${user.username}`}>
                                <li className="topbarItemConfg">
                                            Ver Perfil
                                </li>
                            </Link>
                            <Link to={`/messeger/`}>
                                <li className="topbarItemConfg">
                                            Ver Messages
                                </li>
                            </Link>
                            <Link to={`/profile/config/${user.username}`}>
                                <li className="topbarItemConfg">
                                            Editar Perfil
                                </li>
                            </Link>
                                <li className="topbarItemConfg">
                                            Modo Dark
                                </li>
                            <Link to={`/logout`} onClick={handleLogout}>
                                <li className="topbarItemConfg">
                                            Logout
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
  );
};

export default Topbar;

import { MoreVert} from '@material-ui/icons'
import { useEffect, useState } from 'react';

//importando timeago para el formato de hours ago para date

// import {Users as usersDate } from '../../data/dummyData'
import { Link } from 'react-router-dom';

import { format } from 'timeago.js'
import { API_URL, IMG_RECURSOS_SERVER } from '../../conf'
import { getUser } from '../../services/user.services';
import { deletePost, likePost } from '../../services/posts.services';

import { useSelector } from 'react-redux';

import './post.css'
import PostEdit from '../post-edit/PostEdit';

const Post = ({ post }) => {
    const [user, setUser] = useState([]);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isOptions, setIsOptions] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    // const {user: currentUser} = useContext(AuthContext);
    const currentUser = useSelector(store => store.user.user)


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser, post.likes]);

    useEffect(() => {
        const getData = async () => {
            let res = await getUser(`${API_URL}/users/users?userId=${post.userId}`)
            setUser(res)
        }
        getData();
    }, [post.userId]);


    const handleLike = async () => {
        await likePost(`${API_URL}/posts/${post._id}/like`, { userId: currentUser._id })
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked);
    }


    //eliminando un post
    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            console.log('eliminado')
            const res = await deletePost(`${API_URL}/posts/${post._id}`, { userId: currentUser._id });
            console.log(res);
            //debemos mejorar esta interfaz
            if (res.error) return;
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }
    //eliminando un post


    const handlePreDelete = () => setIsDelete(!isDelete);


    const cancelSave = () => {
        setIsEdit(false);
    }


    return (
        <div className="post-container">
            {
                !isEdit
                    ? <div className="postWrapper" >
                        <div className="postTop" >
                            <div className="postTopLeft">
                                <Link to={`/profile/${user.username}`}>
                                    <img
                                        className="postProfileImg"
                                        src={user.profilePicture}
                                        alt="foto" />
                                </Link>
                                <Link to={`/profile/${user.username}`} style={{ color: 'black' }}>
                                    <span className="postUsername">{user.username}</span>
                                </Link>
                                <span className="postDate">{format(post.createdAt)}</span>
                            </div>
                            <div className="postTopRight">
                                {   //esto se renderiza solo si solo somo dueño del post
                                    user._id === currentUser._id &&
                                    <>
                                        <MoreVert
                                            className="posTopRightIcon"
                                            onClick={() => setIsOptions(true)} />
                                        <ul className="postTopOptions" style={{ display: isOptions ? 'block' : 'none' }}>
                                            <li
                                                onClick={() => {
                                                    setIsEdit(true)
                                                    setIsOptions(false)
                                                }}
                                                className="postTopItem">
                                                Editar
                                            </li>
                                            <li
                                                className="postTopItem">
                                                {
                                                    isDelete
                                                        ? <>
                                                            <span className="yes" onClick={handleDelete}>Si</span>
                                                            <span className="not" onClick={handlePreDelete}>No</span>
                                                        </>
                                                        : <span className="delete" onClick={handlePreDelete}>Eliminar</span>
                                                }

                                            </li>
                                            <li
                                                className="postTopItem"
                                                onClick={() => {
                                                    setIsOptions(false)
                                                    setIsDelete(false)
                                                }}>
                                                Cerrar
                                            </li>
                                        </ul>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="postCenter">
                            <span className="postText">
                                {post?.desc}
                            </span>
                            <img
                                className="postImg"
                                src={post.img}
                                alt="" />
                        </div>
                        <div className="postBottom">

                            <div className="postBottomLeft">
                                <img
                                    onClick={handleLike}
                                    className="likeIcon"
                                    src={`${IMG_RECURSOS_SERVER}/like.png`}
                                    alt="like icon" />
                                <img
                                    onClick={handleLike}
                                    className="likeIcon"
                                    src={`${IMG_RECURSOS_SERVER}/heart.png`}
                                    alt="heart icon" />
                                <span className="postLikeCounter">
                                    {like} people like it
                                </span>
                            </div>
                            <div className="postBottomRight">
                                <span className="postCommentText">{post?.comment} comments</span>
                            </div>
                        </div>
                    </div>
                    : <PostEdit
                        user={user}
                        cancelSave={cancelSave}
                        setIsEdit={setIsEdit}
                        post={post}/>
            }
        </div>
    );
}

export default Post;
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'
import { Cancel, EditOutlined, PermMediaOutlined } from '@material-ui/icons'


import './postEdit.css'
import { updatePost } from '../../services/posts.services'
import { API_URL } from '../../conf';

const imgInitialValue = { url: '', change: false };

const PostEdit = ({ user, post, setIsEdit, cancelSave }) => {
    const [isSave, setIsSave] = useState(false);
    const [img, setImg] = useState(imgInitialValue);
    const [file, setFile] = useState(null);
    const desc = useRef();


    useEffect(() => {
        setImg({ ...img, url: post.img || null })

    }, []);


    const handleChange = e => {
        if (desc.current.value !== post.desc || img.url === 'file') {
            setIsSave(true)
        }
        else {
            setIsSave(false)
        }
    }


    const handleFilePost = e => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setIsSave(true)
        setImg({ img: 'file', change: true });
    }

    const handleUpdate = async (e) => {
        e.stopPropagation();

        if(desc.current.value === '' && img.url === null && !file ){
            desc.current.placeholder = 'debe llenar al menos un campo...';
            setTimeout(() => {
                //en caso de que se desmont el elemento
                if(desc.current)
                    desc.current.placeholder = 'write description post...'
            }, 3000);
            return;
        }

        //haermos submit solo cuando vea reales cambios
        if ( desc.current.value === post.desc && !file){
            console.log('no se guardo cambios');
            setIsEdit(false);
            return;
        }    
        
        try {
            let data = new FormData();

            if (file) {
                // console.log('tendra imagen');
                data.append('file', file); //tendra el campo file
            }else{
                // console.log(img.url || '');
                data.append('img', img.url || ''); // editamos el valor de
            }

            console.log('submit');
            data.append('desc', desc.current.value)
            data.append('userId', post.userId)

            const res = await updatePost(`${API_URL}/posts/${post._id}`, data);
            console.log(res);
            
            //ebemos mejorar esta interfaz
            // if(res.error) return ;
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleCancelImg = () => {
        setIsSave(true)
        setImg({ url: null, change: true });
        // setImg({ url: null, change: false });
        setFile(null);
    }


    return (
        <div className="postWrapper" >
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
                </div>
            </div>
            <div className="postCenter">
                <textarea
                    type="text"
                    className="postText"
                    name="desc"
                    required
                    id="desc"
                    placeholder="write description post..."
                    onChange={handleChange}
                    ref={desc}
                    defaultValue={post?.desc || ''} />
                <img
                    className="postImg"
                    src={file ? URL.createObjectURL(file) : img?.url}
                    alt="" />
                <input
                    type="file" name={`file${post._id}`}
                    id={`file${post._id}`} style={{ display: 'none' }}
                    onChange={handleFilePost}
                    accept=".png,.jpeg,.jpg" />

                {   //icon para agregar imgPost
                    img.url === null 
                            ? <label
                                className="addImg"
                                htmlFor={`file${post._id}`}>
                                <PermMediaOutlined
                                    className="addImgIcon"
                                    htmlColor="green" />
                                Add Img
                              </label>

                            : <>
                                <label htmlFor={`file${post._id}`} className="postIconEdit">
                                    <EditOutlined />
                                </label>
                                <Cancel
                                    className="postIconDelt"
                                    onClick={handleCancelImg} />
                              </>
                }
            </div>
            <div className="postBottom">
                <button
                    // className="postBottomBtn isSave"
                    className="postBottomBtn"
                    style={{ opacity: (isSave || img.chang) && '1' }}
                    onClick={handleUpdate}>Save</button>
                <button
                    className="postBottomBtn"
                    onClick={cancelSave} >Cancel</button>

            </div>
        </div>
    );
}

export default PostEdit;
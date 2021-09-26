import './share.css'

import {PermMedia, Label, Room, EmojiEmotions, Cancel} from '@material-ui/icons'
import { useRef, useState } from 'react';
import { API_URL } from '../../conf';
import {newPostFetch} from '../../services/posts.services'
import { useSelector } from 'react-redux';

const Share = () => {

    // const {user} = useContext(AuthContext);
    const user = useSelector(store => store.user.user)
    const desc = useRef();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(desc.current.value === '' && file === null) return ;
        try {
            const data = new FormData();

            data.append("userId", user._id);
            data.append("desc", desc.current.value);
            
            if(file) data.append("file", file); 

            await newPostFetch(`${API_URL}/posts`, data);
            window.location.reload()
        } 
        catch (error) {
            console.log(error);
        } 
    }

    const handleChange = (e) => {
        console.log('cambios en la foto');
        setFile(e.target.files[0])
    }

    return ( 
        <div className="share-container">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={user.profilePicture } 
                        alt="" 
                    />
                    <input 
                        className="shareInput"
                        ref={desc}
                        placeholder={`What's in your mind ${user.username}? . . .`} type="text" 
                        />
                </div>
                <hr className="shareHr" />
                {
                    file && (
                        <div className="shareImgContainer">
                            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                            <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
                        </div> 
                    
                    )
                }
                <form className="shareBottom" onSubmit={handleSubmit} encType="multipart/form-data" >
                    <div className="shareOptions">
                        <label htmlFor="fileShare" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText" >Photo or Video</span>
                            <input 
                                style={{display: "none"}} 
                                type="file" id="fileShare" 
                                onChange={handleChange} 
                                accept=".png,.jpeg,.jpg" />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText" >Photo or Video</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText" >Photo or Video</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText" >Photo or Video</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default Share;
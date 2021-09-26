import { Cancel, EditOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {API_URL} from '../../conf';
import { updatePicture } from "../../services/user.services";
import { userActions } from "../../store/actions";
import { decode } from 'jsonwebtoken'

const ProfileEditImg = ({ user ,imgUrl, setImgUrl }) => {

    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleFile = e => {
        // console.log('entro al onchange de file edit', e.target.files)
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('entro al submit del edit')
        try {
            
            if (file){
                const data = new FormData();
                data.append("file", file);
                const res = await updatePicture(`${API_URL}/users/${imgUrl.pathUrl}/${user._id}`, data);
                console.log('update profile picture',res)
                dispatch(userActions.updateUserSuccess(decode(res.token)))
                setImgUrl(null);
            } 

            // await newPostFetch(`${API_URL}/posts`, data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="imgEdit-container">
            <div className="imgEdit">
                <img
                    src={file ? URL.createObjectURL(file) : imgUrl.url}
                    alt="" />
                <label htmlFor="fileProf">
                    <EditOutlined
                        className="imgEditIconEdit"
                        htmlFor="fileProf" />
                </label>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    name="fileProf" id="fileProf"
                    onChange={handleFile}
                    accept=".png,.jpeg,.jpg" />
                <Cancel
                    className="imgEditIconCancel"
                    onClick={ () => setImgUrl(null) } />
                <button
                    onClick={handleSubmit} 
                    className="btnSave"> 
                    Save 
                </button>
            </div>
        </div>
    )
}


export default ProfileEditImg;
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

import { useSelector } from 'react-redux';

import './settings.css'
import SettingAcount from '../../components/setting-acoutn/SettingAcount';
import SettingGeneral from '../../components/setting-general/SettingGeneral.jsx';



export default function Setting() {

    const {user} = useSelector(store => store.user);
  

    return(
        <>
            <Topbar/>
            <div className="settings-container">
                <Sidebar/>  
                <div className="settingWrapper">
                    <h2 className="settingTitle">
                        Configuracion de Perfil
                    </h2>
                    <div className="settingOptions">
                        <SettingAcount user={user}/>
                        <SettingGeneral user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}


export const CancelRem = ({onClick}) => {
    return (
        <span onClick={onClick} className="cancelRem">x</span>
    );
}
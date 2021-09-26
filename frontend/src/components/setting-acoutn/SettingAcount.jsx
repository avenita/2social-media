import {Edit, Check} from '@material-ui/icons'

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validationEmail } from '../../services/user.services';
import { API_URL } from '../../conf';
import {CancelRem} from '../../pages/setting/Setting'

import './settingAcount.css'
import { userActions } from '../../store/actions';


const initialFocusValue = {
    username: false, email: false, password: false, passwordAgain: false
}

const initialForm = {
    username: '', email: '', password: ''
}

const initialVerification = {
    msg: '', color: ''
}


const SettingAcount = ({user}) => {

    const [verificationMsg, setVerificationMsg] = useState(initialVerification);
    const dispatch = useDispatch();

    const [form, setForm] = useState(initialForm);
    const passwordAgain = useRef();
    const [focus, setFocus] = useState({});
    const [cancel, setCancel] = useState();
    const [error, setError] = useState(null);

    const { error: errorState } = useSelector(store => store.user)

    useEffect(() => {
        initForm();
    }, [user]);

    const initForm = () => { 
        setForm({
            username: user.username, email: user.email, password: ''
        })
        passwordAgain.current.value = '';
        setCancel(false);
        setError(null);
    }

    const onDisable = (target) => {
        document.querySelector(`input[name=${target}]`).toggleAttribute('disabled');
        document.querySelector(`input[name=${target}]`).classList.toggle('edit');
        document.querySelector(`input[name=${target}]`).matches('edit')   && document.querySelector(`input[name=${target}]`).focus();
        
        setFocus({
            ...focus,
            [target]: !focus[target]
        })
    }
    
    const handleBlur = () => {
        if(form.email !== user.email){
            validationEmail(`${API_URL}/users/${user._id}`, {email: form.email})
                .then(res => {
                    if (res.msg){
                        setVerificationMsg({...verificationMsg, msg:res.msg, color: 'green'}) 
                        setTimeout(() => setVerificationMsg({...verificationMsg ,msg: ''}), 3000);
                    }
                    else{
                        setVerificationMsg({...verificationMsg,msg: res.error, color: 'red'})
                    } 
                })
        }else{
            setVerificationMsg({...verificationMsg,msg:'correo electronico valido', color: 'green'}) 
            setTimeout(() => setVerificationMsg({...verificationMsg ,msg: ''}), 3000);
        }
    }
     
    const handleCancel = (target) => {
        if(target === 'email'){
            setVerificationMsg({...verificationMsg ,msg: ''})
        }
        if(target.current){
            target.current.value = target.current.defaultValue;
            onDisable(target.current.name);
        }else{
            setForm({
                ...form,
                [target]: user[target] || ''
            })
            onDisable(target);
        }

    }

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setCancel(true);
    }
    

    const handleChangeRef = () => {
        if(form.password !== passwordAgain.current.value ){
            setError('la contraseña no coincide')
        }else{
            setError(null);
        }
    }


    const reset = () => {
        document.querySelectorAll('input').forEach(input => {
            input.setAttribute('disabled', null)
            input.classList.remove('edit')
        })
        setFocus(initialFocusValue);
        setError(null);
        setCancel(false);
    }


    const handleSubmit = e => {
        e.preventDefault();
        try {
            let data = {};
            if(form.password !== '' || passwordAgain.current.value !== '' ){
                if (form.password === passwordAgain.current.value){
                    data = { password: form.password }
                }
                else{
                    setError('la contraseña no coincide')
                    return
                }
            } 
            if(verificationMsg.msg === ''){
                data.username = form.username;
                data.email = form.email;
                dispatch(userActions.updateUserRequest(data, user._id)); 
                setTimeout(() => dispatch(userActions.isSignError(null)) , 3000);
            }
        } 
        catch (error) {
            setError(error.message);
            setTimeout(() => setError(null), 3000);    
        }
    }



    return ( 
        <div className="settingOptionsTop">
            <h3 className="settingOptionSubtitle">
                Configuracion de la Cuenta
            </h3>
            <div className="settingOptionsTopWrapper">
                <div className="settingLabels">
                    <label htmlFor="username">Username</label>
                    <label htmlFor="email">Email</label>
                    <h4>Cambiar contraseña</h4>
                    <label htmlFor="newPassword">new Password</label>
                    <label htmlFor="newPasswordAgain">new Password Again</label>
                </div>
                <form className="settingInputs" >
                    <div className="settingInputContainer">
                        <input
                            disabled 
                            required
                            autoComplete="off" 
                            type="text" 
                            name="username"
                            onChange={handleChange} 
                            id="username"
                            value={form.username}
                            />
                        {
                            focus.username 
                                ? <>
                                    <CancelRem 
                                        onClick={()=>handleCancel('username')} />
                                    <Check 
                                        className="settingIconEdit" 
                                        onClick={()=>onDisable('username')}/> 
                                  </>
                                : <Edit 
                                    className="settingIconEdit" 
                                    onClick={()=>onDisable('username')} />
                        }
                    </div>
                    <div className="settingInputContainer">
                        <input
                            disabled 
                            required
                            autoComplete="off" 
                            type="email" 
                            name="email" 
                            onChange={handleChange}
                            id="email"
                            onBlur={handleBlur}
                            value={form.email}
                             />
                        {
                            focus.email
                                ? <>
                                    <CancelRem 
                                        onClick={()=>handleCancel('email')} />
                                    <Check 
                                        className="settingIconEdit"
                                        onClick={()=>onDisable('email')} /> 
                                  </>
                                : <Edit 
                                    className="settingIconEdit" 
                                    onClick={()=>onDisable('email')}/>
                        }
                    </div>
                    <div className="verificationMsg"> 
                        <span style={{color: verificationMsg.color}}>{verificationMsg.msg}</span>
                    </div>
                    <div className="settingInputContainer">
                        <input
                            disabled 
                            autoComplete="off" 
                            type="password" 
                            name="password" 
                            onChange={handleChange}
                            id="password"
                            value={form.password}
                            />
                        {
                            focus.password
                                ? <>
                                    <CancelRem 
                                        onClick={()=>handleCancel('password')}/>
                                    <Check 
                                        className="settingIconEdit"
                                        onClick={()=>onDisable('password')}/>
                                  </>
                                : <Edit 
                                    className="settingIconEdit" 
                                    onClick={()=>onDisable('password')}/>
                        }
                    </div>
                    <div className="settingInputContainer">
                        <input
                            disabled 
                            autoComplete="off" 
                            type="password" 
                            name="passwordAgain"
                            id="passwordAgain"
                            onChange={handleChangeRef} 
                            ref={passwordAgain}
                            defaultValue="" 
                            />
                        {
                            focus.passwordAgain
                                ?  <>
                                    <CancelRem 
                                        onClick={()=>handleCancel(passwordAgain)}/>
                                    <Check 
                                        className="settingIconEdit" 
                                        onClick={()=>onDisable('passwordAgain')}/> 
                                  </>
                                : <Edit 
                                    className="settingIconEdit" 
                                    onClick={()=>onDisable('passwordAgain')}/>
                        }
                    </div>
                </form>
            </div>

            <div className="settingButtons">
                <button 
                    onClick={handleSubmit}
                    className={`settingButton ${!cancel ? 'disabled' :''}`}  >
                    Guardar Cambio
                </button>
                <button 
                    className="settingButton"
                    onClick={reset}
                    style={{display: cancel ? 'block' : 'none' }}>
                    Cancel
                </button>
            </div>
            
            <div className="settingError">
                <span>{error || errorState}</span>
            </div>

    </div>
    );
}
 
export default SettingAcount;
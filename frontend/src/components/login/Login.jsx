import { CircularProgress } from '@material-ui/core';
import { ErrorOutlineOutlined} from '@material-ui/icons';
import {  useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {userActions} from '../../store/actions'

import './login.css'

const Login = () => {
    const email = useRef();
    const password = useRef();

    const dispatch = useDispatch();
    const { isPromise , error} = useSelector( store => store.user)


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            dispatch(userActions.signInRequest({
                email: email.current.value,
                password: password.current.value
            }))
        } 
        catch (error) {
            dispatch(userActions.isSignError(error))
        }
        setTimeout(() => {
            dispatch(userActions.isSignError(null))
        }, 4000);
    }

    return ( 
        <div className="login-container">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        MatrixSocial
                    </h3>
                    <span className="loginDesc">
                        Connect with friends and the wordl around you on MatrixSocial. 
                    </span>
                </div>
                <div className="loginRight" onSubmit={handleSubmit}>
                    <form className="loginBox">
                        <div className="loginInputContainer">
                            <input 
                                className="loginInput" 
                                placeholder="Email" 
                                required 
                                ref={email} 
                                type="email" 
                                name="email" />
                            {
                                error &&
                                    <ErrorOutlineOutlined className="loginInputIconALert" />
                            }
                        </div>
                        <div className="loginInputContainer">
                            <input 
                                className="loginInput" 
                                required
                                ref={password}
                                placeholder="Password" 
                                type="password" />
                            {
                                error &&
                                    <ErrorOutlineOutlined className="loginInputIconALert" />
                            }
                        </div>

                        <button className="loginButton" disabled={isPromise}>
                            {
                                isPromise 
                                    ? <CircularProgress 
                                            size="24px" 
                                            style={{color: "rebeccapurple"}}/>
                                    : 'Log In'    
                            }
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/signup"
                            className="loginReisterButton" 
                            disabled={isPromise}>
                                    Create a new Account
                        </Link>
                        {
                            error &&
                                <span className="loginErroMsg">
                                    {error}
                                </span>
                        }
                    </form>

                </div>
            </div>
        </div>
     );
}
 
export default Login;

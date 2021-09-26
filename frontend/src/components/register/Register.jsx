import { CircularProgress } from '@material-ui/core';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IS_ERROR } from '../../context/authTypes';
import { signupCall } from '../../utils/apiCalls';
import './register.css'

const Register = () => {

    const username = useRef(); 
    const email = useRef() ;
    const password = useRef(); 
    const passwordAgain = useRef(); 
    const history = useHistory();
    // const {dispatch, isPromise} = useContext(AuthContext)

    const {isPromise} = useSelector(store => store.user)
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            return passwordAgain.current.setCustomValidity("Passwords don't match!");
        }else{
            passwordAgain.current.setCustomValidity(null);
            const user ={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await signupCall(user, dispatch);
                history.push("/");
            } 
            catch (error) {
                dispatch({type: IS_ERROR, payload: error})
            } 
        }
    }

    return ( 
        <div className="login-container">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">MatrixSocial</h3>
                    <span className="loginDesc">Connect with friends and the wordl around you on MatrixSocial. </span>
                </div>
                <form className="loginRight" onSubmit={handleSubmit}>
                    <div className="loginBox">
                        <input 
                            className="loginInput" 
                            placeholder="UserName" 
                            type="text" 
                            required
                            ref={username}/>
                        <input 
                            className="loginInput" 
                            placeholder="Email" 
                            type="email" 
                            required
                            ref={email}/>
                        <input 
                            className="loginInput" 
                            placeholder="Password" 
                            type="password" 
                            required
                            ref={password}/>
                        <input 
                            className="loginInput" 
                            placeholder="Password Again" 
                            type="password" 
                            required
                            ref={passwordAgain}/>

                        <button className="loginButton" disabled={isPromise}>
                            {
                                isPromise 
                                    ? <CircularProgress 
                                            size="24px" 
                                            style={{color: "rebeccapurple"}}/>
                                    : 'Sign Up'    
                            }
                        </button>

                        <Link to="/signin" className="loginReisterButton">
                            Log into Account
                        </Link>
                    </div>

                </form>
            </div>
        </div>
     );
}
 
export default Register;
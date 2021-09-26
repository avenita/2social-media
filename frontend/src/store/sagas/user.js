import { call, put, takeEvery } from 'redux-saga/effects'
import { signinFetch } from '../../services/user.services2'
import { userTypes } from '../types'
import { userActions } from '../actions/index'
import { decode } from 'jsonwebtoken'
import { setToken, updateUserFetch } from '../../services/user.services'
import { API_URL } from '../../conf'

function* signInRequest(action) {

    const res = yield call(signinFetch, action.payload) //res => {token}

    if(res.error){
        yield put(userActions.isSignError(res.error))

    }else{
        localStorage.setItem('token', res.token);//guardamos el token
        setToken(res.token);
        yield put(userActions.signInSuccess(decode(res.token)))
    }
    //le damos el next (put) o hacemos que se ejecute en el reducer con la funcion de put y le pasamos el token convertido en datos del user a travez de parametros
}

function* signUpRequest(action) {
    // const res = yield call(userRequestSignUpFetch, action.payload)
    // console.log('saga',res);

    // yield put(userActions.signUpSuccess(res))
}

function* updateUser(actions){
    const {userCredentials, id} = actions.payload;
    const res = yield call(updateUserFetch, `${API_URL}/users/${id}`, userCredentials);  
    // console.log('saga',res)  
    
    if(res.error){
        yield put(userActions.isSignError(res.error));
    }
    else{ //guardamos el new Token
        localStorage.setItem('token', res.token);
        setToken(res.token);
    
        yield put(userActions.updateUserSuccess(decode(res.token)))
    }
}

//esta funcion generadora siempre estara viendo la acciones y cada que vea un acction de tipo signIn_request el ejecutara dicha funcion generadora singInRequest 
function* userWatcher() {
    yield takeEvery(userTypes.SIGNIN_REQUEST, signInRequest)
    yield takeEvery(userTypes.SIGNUP_REQUEST, signUpRequest)
    yield takeEvery(userTypes.UPDATE_USER_REQUEST, updateUser)
}

export { userWatcher };
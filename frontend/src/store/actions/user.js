//con el * importamos todo los elementos del archivo types.js y con el as le damos un alias es decir un nombre con que el que podremos acceder a ello cada que queramos  =>  const {SIGNUP_REQUEST: jose} = require('./types');

import {userTypes} from '../types'

export const actions = {};

actions.signUpRequest = (userCredentials) => {
    return {
        type: userTypes.SIGNUP_REQUEST,
        payload:userCredentials
    };
} 

actions.signUpSuccess = (userRes) => {
    return {
        type: userTypes.SIGNUP_SUCCESS,
        payload:userRes
    };
} 

actions.signInRequest = (userCredentials) => {
    return {
        type: userTypes.SIGNIN_REQUEST,
        payload:userCredentials
    };
} 

actions.signInSuccess = (userRes) => {
    return {
        type: userTypes.SIGNIN_SUCCESS,
        payload:userRes
    };
} 

actions.isSignError = (error) => {
    return {
        type: userTypes.SIGN_ERROR,
        payload: error
    }
}

actions.logout = () => {
    return {
        type: userTypes.LOGOUT
    };
} 

actions.updateUserRequest = (userCredentials, id) => {
    return {
        type:userTypes.UPDATE_USER_REQUEST,
        payload: { userCredentials, id}
    }
}


actions.updateUserSuccess = (userRes) => {
    return {
        type:userTypes.UPDATE_USER_SUCCESS,
        payload: userRes
    }
}


//antes era asi por si las moscas
// export const actions;
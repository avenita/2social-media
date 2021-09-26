import { userTypes } from '../types';

const userInitialValue = {
    isPromise: false
}

export const userReducer = (state = userInitialValue, action) => {
    const { type, payload } = action;

    switch (type) {
        case userTypes.SIGNUP_REQUEST:
        case userTypes.SIGNIN_REQUEST:
            return {
                ...state,
                isPromise: true
            }

        case userTypes.SIGNIN_SUCCESS: {
            return {
                ...state,
                isPromise: false,
                user: payload
            }
        }

        case userTypes.SIGNUP_SUCCESS:
            // console.log('reducer', payload);
            let { msg, error } = payload;
            return {
                ...state, isPromise: false, msg, error
            }

        case userTypes.UPDATE_USER_SUCCESS:
            console.log('reducer', payload);
            return {
                ...state,
                user: payload
            }

        case userTypes.LOGOUT:
            return {
                isPromise: false
            }


        case userTypes.SIGN_ERROR:
            return {
                ...state,
                isPromise: false,
                error: payload
            }

        default:
            return state;
    }
}


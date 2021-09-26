import { FOLLOW, IS_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS, UNFOLLOW } from "./authTypes";

export const authSReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case SIGNIN_REQUEST:
            return {
                ...state,
                isPromise: true
            }            
    
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isPromise: false,
                error: null,
                user: payload
            }            
    
        case SIGNUP_REQUEST:
            return {
                ...state,
                isPromise: true
            }            
    
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isPromise: false
            }            
    
        case FOLLOW:
            return { 
                ...state,
                user:{
                    ...state.user,
                    followings:[...state.user.followings, payload]
                }
            }            
    
        case UNFOLLOW:
            return {
                ...state,
                user:{
                    ...state.user,
                    followings: state.user.followings.map( foll => foll !== payload)
                }
            }            
    
        case IS_ERROR:
            return {
                ...state,
                isPromise: false,
                error: payload,
                user: null
            }  

        default:
            return state;
    
    }
}
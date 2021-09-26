import { postsTypes } from '../types'


const postsInitialValue = {
    isPromise: false,
    posts: []
}

export const postsReducer = (state = postsInitialValue, action ) => {
    const { type , payload} = action ;

    switch (type) {
        case postsTypes.GET_POSTS_ALL_REQUEST:
        case postsTypes.GET_POSTS_TO_USER_REQUEST:
            return{
                ...state,
                isPromise: true,
            }
        
        case postsTypes.GET_POSTS_ALL_SUCCESS:
            return{
                ...state,
                isPromise: false,
                posts: [...payload]
            }
    
        
        case postsTypes.GET_POSTS_ALL_ADD:
            return{
                ...state,
                isPromise: false,
                posts: [...state.posts, ...payload]
            }
    
        
        case postsTypes.GET_POSTS_ALL_ERROR:
            return{
                ...state,
                isPromise: false,
                error: payload, 
            }
        
        case postsTypes.GET_POSTS_TO_USER_SUCCESS:
            return{
                ...state,
                isPromise: true,
                posts: [...payload]
            }
    
        case postsTypes.GET_POSTS_TO_USER_ADD:
            return{
                ...state,
                isPromise: true,
                posts: [...state.posts, ...payload]
            }
    
        
        case postsTypes.GET_POSTS_TO_USER_ERROR:
            return{
                ...state,
                isPromise: false,
                error: payload, 
            }
    
        default:
            return state;
    }

}


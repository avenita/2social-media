import { combineReducers } from 'redux';

import { userReducer } from './user'

import { postsReducer } from './posts'

//importamos redux-form 
// import { reducer as formReducer } from 'redux-form';

export const reducer = combineReducers({ 
    user: userReducer,
    posts: postsReducer
})

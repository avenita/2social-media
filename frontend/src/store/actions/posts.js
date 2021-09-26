import { postsTypes } from '../types'

export const actions = {}

actions.getPostsUserRequest = ({username, page}) => {
    return {
        type: postsTypes.GET_POSTS_TO_USER_REQUEST,
        payload: {username, page}
    }
}

actions.getPostsUserSuccess = (resPosts) => {
    return {
        type: postsTypes.GET_POSTS_TO_USER_SUCCESS,
        payload: resPosts
    }
}

actions.getAddPostsUser = (addPost) => {
    return {
        type: postsTypes.GET_POSTS_TO_USER_ADD,
        payload: addPost
    }
}

actions.getPostsUserError = (errMsg) => {
    return {
        type: postsTypes.GET_POSTS_TO_USER_ERROR,
        payload: errMsg
    }
}

actions.getPostsAllRequest = ({idUser, page}) => {
    return {
        type: postsTypes.GET_POSTS_ALL_REQUEST,
        payload: {idUser, page}
    }
}

actions.getPostsAllSuccess = (resPosts) => {
    return {
        type: postsTypes.GET_POSTS_ALL_SUCCESS,
        payload: resPosts
    }
}

actions.getAddPostsAll = (addPosts) => {
    return {
        type: postsTypes.GET_POSTS_ALL_ADD,
        payload: addPosts
    }
}

actions.getPostAllError = (errMsg) => {
    return {
        type: postsTypes.GET_POSTS_ALL_ERROR,
        payload: errMsg
    }
}


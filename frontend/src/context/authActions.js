import { FOLLOW, IS_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS, UNFOLLOW } from "./authTypes"

export const signinRequest = (userCredential) => ({
    type: SIGNIN_REQUEST
})

export const signinSuccess = (user) => ({
    type: SIGNIN_SUCCESS,
    payload: user
})

export const isError = (error) => ({
    type: IS_ERROR,
    payload: error
})

export const signupRequest = (userCredential) => ({
    type: SIGNUP_REQUEST
})

export const signupSuccess = () => ({
    type: SIGNUP_SUCCESS
})

export const follow = (userId) => ({
    type: FOLLOW,
    payload: userId
})

export const unFollow = (userId) => ({
    type: UNFOLLOW,
    payload: userId
})




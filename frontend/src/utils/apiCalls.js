import { API_URL } from "../conf"
import { IS_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../context/authTypes"

export const signinCall = async (userCredentials, dispatch) => {
    await dispatch({ type: SIGNIN_REQUEST })
    try {
        let res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-type": "application/json"
            },
            body: JSON.stringify(userCredentials)
        });

        let json = await res.json();
        if (json.error) throw Error(json.error);

        await dispatch({ type: SIGNIN_SUCCESS, payload: json })

    } catch (error) {
        await dispatch({ type: IS_ERROR, payload: error.message })
    }
}

export const signupCall = async (userCredentials, dispatch) => {
    await dispatch({ type: SIGNUP_REQUEST })
    try {
        let res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-type": "application/json"
            },
            body: JSON.stringify(userCredentials)
        });

        let json = await res.json()

        if (json.error) throw Error(json.error);

        await dispatch({ type: SIGNUP_SUCCESS, payload: json })

    } catch (error) {
        await dispatch({ type: IS_ERROR, payload: error.message })
    }
}

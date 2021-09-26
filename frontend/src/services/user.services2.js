import { API_URL } from "../conf"

const optionFetch = (method, data) => {
    if (data) {
        return {
            method,
            headers: {
                Accept: 'application/json',
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
    } else {
        return {
            method,
            headers: {
                Accept: 'application/json',
                "Content-type": "application/json"
            }
        }
    }
}

export const signinFetch = (data) => {
    return fetch(`${API_URL}/auth/login`, optionFetch('POST', data))
            .then(res => res.json())
            .catch(err => console.log(err))
}


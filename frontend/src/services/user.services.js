let token;

export const setToken = (tokenCredetials) => {
    token = tokenCredetials;
}

// Authorization: `Bearer ${token}`

const optionFetch = (method, data) => {
    // console.log(token)
    if (data) {
        return {
            method,
            headers: {
                Accept: 'application/json',
                "Content-type": "application/json",
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


export const getUser = (url) => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => err)
}


export const validationEmail = (url, data) => {
    return fetch(url, optionFetch('PATCH', data))
        .then(res => res.json())
        .catch(err => err)
}


export const getValidationEmail = (url, data) => {
    validationEmail(url, data).then(res => {
        if (res.error)
            return false;
        else
            return true;
    })
}


export const updateUserFetch = (url, data) => {
    console.log(token && 'tenemos token')
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => err)
}


export const updatePicture = (url, data) => {
    console.log(token && 'tenemos token')
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            contentType: "multipart/form-data"
            // Authorization: `Bearer ${token}`
        },
        body: data
    })
        .then(res => res.json())
        .catch(err => err)
}


export const getFriendsUser = async (url) => {
    try {
        const res = await fetch(url)
        return await res.json()
    } catch (err) {
        return err
    }
}


//request follow and unfollow
export const followUser = async (url, data) => {
    return fetch(url, optionFetch('PUT', data))
        .then(res => res.json())
        .catch(err => err)
}

//request follow and unfollow
export const unFollowUser = async (url, data) => {
    return fetch(url, optionFetch('PUT', data))
        .then(res => res.json())
        .catch(err => err)
}

export const getTwoConversation = (url) => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => err)
}


export const findUsersFetch = (url, data) => {
    return fetch(url, optionFetch('POST', data))
        .then(res => res.json())
        .catch(err => console.log(err))
} 
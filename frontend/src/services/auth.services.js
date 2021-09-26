
export const userRequestSignFetch = async (user) => {
    try {
        const res = await fetch(`http://localhost:4444/api/user/signin`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
        return await res.json()
    } catch (err) {
        return console.log(err)
    }

}

export const userRequestSignUpFetch = async (user) => {
    try {
        const res = await fetch(`http://localhost:4444/api/user/signUp`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
        return await res.json()
    } catch (err) {
        return console.log(err)
    }

}


export const logout = (url) => {
    return fetch(url)
            .then(res => res.json())
            .catch(err => console.log(err))
}
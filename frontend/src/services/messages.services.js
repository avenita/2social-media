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


export const getMessage = (url) => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const newMessageFetch = (url, data) => {
    return fetch(url, optionFetch('POST', data))
        .then(res => res.json())
        .catch(err => console.log(err))
}
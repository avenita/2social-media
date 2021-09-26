
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


export const getPosts = (url) => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
}


export const likePost = (url, data) => {
    return fetch(url, optionFetch('PUT', data))
        .then(res => res.json())
        .catch(err => console.log(err))
}


// export const newPostFetch = (url, data) => {
//     return fetch(url, optionFetch('POST', data))
//         .then(res => res.json())
//         .catch(err => console.log(err))
// }


//configuracion especial en el headers para la guardada de foto
export const newPostFetch = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            contentType: "multipart/form-data"
        },
        body: data //muy importante no convertir
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}



export const deletePost = (url, data) => {
    return fetch(url, optionFetch('DELETE', data))
        .then(res => res.json())
        .catch(err => console.log(err))
}


export const updatePost = (url, data) => {
    return fetch(url, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            contentType: "multipart/form-data"
        },
        body: data //muy importante no convertir
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


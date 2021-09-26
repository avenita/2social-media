import { call, put, takeEvery } from 'redux-saga/effects'
import { postsTypes } from '../types'
import { postsActions } from '../actions'

import { getPosts } from '../../services/posts.services'
import { API_URL } from '../../conf'

function* getPostsAll(action) {
    const { idUser, page } = action.payload;

    try {
        const res = page > 1
            ? yield call(getPosts, `${API_URL}/posts/timeline/${idUser}?page=${page}`)
            : yield call(getPosts, `${API_URL}/posts/timeline/${idUser}`)

        if (res.error) {
            yield put(postsActions.getPostAllError(res.error))
        } else {
            page > 1
                ? yield put(postsActions.getAddPostsAll(res.docs))
                : yield put(postsActions.getPostsAllSuccess(res.docs))
        }
    } catch (error) {
        console.error(error.message);
        yield put(postsActions.getPostAllError(error.message))
    }
    //le damos el next (put) o hacemos que se ejecute en el reducer con la funcion de put y le pasamos el token convertido en datos del user a travez de parametros
}

function* getPostsUser(action) {
    const { username, page } = action.payload;
    try {
        const res = page > 1
            ? yield call(getPosts, `${API_URL}/posts/profile/${username}?page=${page}`)
            : yield call(getPosts, `${API_URL}/posts/profile/${username}`)

        if (res.error) {
            yield put(postsActions.getPostsUserError(res.error))
        } else {
            page > 1
                ? yield put(postsActions.getAddPostsUser(res.docs))
                : yield put(postsActions.getPostsUserSuccess(res.docs))
        }
    } catch (error) {
        console.error(error.message);
        yield put(postsActions.getPostsUserError(error.message))
    }
    //le damos el next (put) o hacemos que se ejecute en el reducer con la funcion de put y le pasamos el token convertido en datos del user a travez de parametros
}


function* postsWatcher() {
    yield takeEvery(postsTypes.GET_POSTS_ALL_REQUEST, getPostsAll)
    yield takeEvery(postsTypes.GET_POSTS_TO_USER_REQUEST, getPostsUser)
}

export { postsWatcher };
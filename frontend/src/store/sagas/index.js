import { all } from 'redux-saga/effects'
import { userWatcher } from './user'
import { postsWatcher } from './posts'


//archivo que unifica todas las sagas creadas
function* rootSaga(){
    yield all([
        userWatcher(), 
        postsWatcher()
    ])
}

export {rootSaga};

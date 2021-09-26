import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from './reducers'
import reduxSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

const sagaMiddleware = reduxSagaMiddleware();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

//despues pondremos para verlo en nuestras herramientas en el browser
sagaMiddleware.run(rootSaga)

export { store }


/* este es nuestro archivo store y sera el primero en ser leido por ser index  */


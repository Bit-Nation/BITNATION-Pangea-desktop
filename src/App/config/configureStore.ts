import createSagaMonitor from '@clarketm/saga-monitor'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers'
import rootSaga from '../sagas'

/**
 * @desc Configures a Redux store.
 * @return {Store} Created store object.
 */
export default function configureStore(routerHistory): Store {
    const sagaMonitor = createSagaMonitor({
        level: 'log',
        actionDispatch: true,
    })
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
    const router = routerMiddleware(routerHistory)

    const mainReducers = {
        router: connectRouter(routerHistory),
        ...reducers,
    }

    const enhancer = compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(logger),
        applyMiddleware(router),
    )

    const rootReducer = combineReducers(mainReducers)

    const store = createStore(rootReducer, enhancer)
    sagaMiddleware.run(rootSaga)
    return store
}

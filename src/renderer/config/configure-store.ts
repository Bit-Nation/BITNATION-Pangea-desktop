import sagaMonitor from '@clarketm/saga-monitor';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import reduxLogger from 'redux-logger';
import sagaMiddlewareFactory from 'redux-saga';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

/**
 * @desc Configures a Redux store.
 * @return Created store object.
 */
export default function configureStore(routerHistory): Store {
    const sagaMonitorInstance = sagaMonitor({
        level: 'log',
        actionDispatch: true,
    });
    const sagaMiddleware = sagaMiddlewareFactory({ sagaMonitor: sagaMonitorInstance });
    const router = routerMiddleware(routerHistory);

    const enhancer = compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(reduxLogger),
        applyMiddleware(router),
    );

    const store = createStore(createRootReducer(routerHistory), enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
}

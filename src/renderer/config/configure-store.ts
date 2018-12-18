import sagaMonitor from '@clarketm/saga-monitor';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import sagaMiddlewareFactory from 'redux-saga';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

/**
 * @desc Configures a Redux store.
 * @return Created store object.
 */
export default function configureStore(routerHistory): any {
    const persistConfig = {
        key: 'root',
        storage,
    };
    const persistedReducer = persistReducer(persistConfig, createRootReducer(routerHistory));

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

    const store = createStore(persistedReducer, enhancer);
    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);
    return { store, persistor };
}

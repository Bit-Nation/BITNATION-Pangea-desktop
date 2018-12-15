import sagaMonitor from '@clarketm/saga-monitor';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import reduxLogger from 'redux-logger';
import reduxSaga from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

/**
 * @desc Configures a Redux store.
 * @return Created store object.
 */
export default function configureStore(routerHistory): Store {
    const sagaMonitorInstance = sagaMonitor({
        level: 'log',
        actionDispatch: true,
    });
    const sagaMiddleware = reduxSaga({ sagaMonitor: sagaMonitorInstance });
    const router = routerMiddleware(routerHistory);

    const mainReducers = {
        router: connectRouter(routerHistory),
        ...reducers,
    };

    const enhancer = compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(reduxLogger),
        applyMiddleware(router),
    );

    const rootReducer = combineReducers(mainReducers);

    const store = createStore(rootReducer, enhancer);
    sagaMiddleware.run(sagas);
    return store;
}

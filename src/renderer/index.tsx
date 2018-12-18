import { createMemoryHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';
import configureStore from './config/configure-store';

const routerHistory = createMemoryHistory();

const syncHistoryWithStore = (storeConfig: any, history: any) => {
    const { router } = storeConfig.getState();
    if (router && router.location) {
        history.replace(router.location);
    }
};

const { store, persistor } = configureStore(routerHistory);

syncHistoryWithStore(store, routerHistory);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={undefined} persistor={persistor}>
            <App history={routerHistory} />
        </PersistGate>
    </Provider>,
    document.getElementById('app'),
);

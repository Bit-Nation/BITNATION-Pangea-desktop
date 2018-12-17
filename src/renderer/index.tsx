import { createMemoryHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './config/configure-store';

const routerHistory = createMemoryHistory();

const syncHistoryWithStore = (storeConfig: any, history: any) => {
    const { router } = storeConfig.getState();
    if (router && router.location) {
        history.replace(router.location);
    }
};

const store = configureStore(routerHistory);

syncHistoryWithStore(store, routerHistory);

ReactDOM.render(
    <Provider store={store}>
        <App history={routerHistory} />
    </Provider>,
    document.getElementById('app'),
);

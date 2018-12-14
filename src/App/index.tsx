import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import configureStore from './config/configureStore';
import routes from './routes';

const routerHistory = createMemoryHistory();
const store = configureStore(routerHistory);

const syncHistoryWithStore = (store, history) => {
	const { router } = store.getState();
	if (router && router.location) {
		history.replace(router.location);
	}
};

syncHistoryWithStore(store, routerHistory);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={routerHistory}>
			{routes}
		</ConnectedRouter>
	</Provider>
	,
	document.getElementById('root')
);

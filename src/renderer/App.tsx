import * as React from 'react';
import { Route, Router } from 'react-router-dom';

import HomePage from './containers/HomePage';
import WalletPage from './containers/WalletPage';

const App = ({ history }) => (
    <Router history={history}>
        <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/wallet" component={WalletPage} />
        </div>
    </Router>
);
export default App;

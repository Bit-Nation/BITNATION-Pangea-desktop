import * as React from 'react';
import { Route, Router } from 'react-router-dom';

import HomePage from './containers/homepage';
import WalletPage from './containers/walletpage';

const App = ({ history }) => (
    <Router history={history}>
        <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/wallet" component={WalletPage} />
        </div>
    </Router>
);
export default App;

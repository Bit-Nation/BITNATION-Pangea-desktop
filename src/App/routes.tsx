import * as React from 'react';
import { Route, Switch } from 'react-router';

import HomePage from './containers/HomePage';
import WalletPage from './containers/WalletPage';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/wallet" component={WalletPage} />
  </Switch>
);

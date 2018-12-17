import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import HomePage from './containers/home-page';
import LoginPage from './containers/login-page';
import RegisterPage from './containers/register-page';
import WalletPage from './containers/wallet-page';

interface IRouterProps {
    history: any;
}

interface IPrivateRouteProps {
    component: React.ComponentClass;
    exact: boolean;
    path: string;
}

const auth = {
    isAuthenticated() {
        if (localStorage.getItem('isLogin') !== null) {
            return true;
        }

        return false;
    },
};

const PrivateRoute = ({ component: Component, ...rest }: IPrivateRouteProps) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

const App = ({ history }: IRouterProps) => (
    <Router history={history}>
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />

            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/wallet" component={WalletPage} />
        </Switch>
    </Router>
);
export default App;

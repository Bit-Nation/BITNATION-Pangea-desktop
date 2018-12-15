import * as React from 'react'
import {
    Route,
    Router,
    Redirect,
    Switch
} from 'react-router-dom'

import HomePage from './containers/HomePage'
import WalletPage from './containers/WalletPage'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'


interface RouterProps {
    history: any
}

interface PrivateRouteProps {
    component: React.ComponentClass,
    path: string,
}

const auth = {
    isAuthenticated() {
        if (localStorage.getItem('isLogin')) {
            return true
        }

        return false
    },
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/login" />
                )
        }
    />
)


const App = ({ history }: RouterProps) => (
    <Router history={history}>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />

            <PrivateRoute path="/" component={HomePage} />
            <PrivateRoute path="/wallet" component={WalletPage} />
        </Switch>
    </Router>
)
export default App

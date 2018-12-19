import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';

import HomePage from './containers/home-page';
import LoginPage from './containers/login-page';
import RegisterPage from './containers/register-page';
import ChatPage from './containers/chat-page';
import RoomPage from './containers/room-page';
interface IRouterProps {
    history: any;
}

interface IPrivateRouteProps {
    component: React.ComponentClass;
    exact: boolean;
    path: string;
}

const auth = {
    isAuthenticated(props) {
        if (localStorage.getItem('user') !== null) {
            return true;
        }

        return false;
    },
};

const PrivateRoute = ({ component: Component, ...rest }: IPrivateRouteProps) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated(props) ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const App = ({ history }: IRouterProps) => (
    <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />

                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/chat" component={ChatPage} />
                <PrivateRoute exact path="/room/:id" component={RoomPage} />
            </Switch>
        </ConnectedRouter>
    </MuiThemeProvider>
);
export default App;

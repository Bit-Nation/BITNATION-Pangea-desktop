// import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { login } from '../actions/user';

import Login from '../components/login';

const LoginPage = connect(
    state => ({ ...state }),
    dispatch => ({
        login: (username: string, password: string) => dispatch(login(username, password)),
    }),
)(Login);

export default LoginPage;

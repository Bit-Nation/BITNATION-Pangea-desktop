import { connect } from 'react-redux';
import { login } from '../actions/user';

import Login from '../components/login';

const LoginPage = connect(
    ({ user, classes }: any) => ({ user, classes }),
    dispatch => ({
        login: (username: string, password: string) => dispatch(login(username, password)),
    }),
)(Login);

export default LoginPage;

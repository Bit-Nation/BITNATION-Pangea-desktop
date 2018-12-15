// import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { showSpinner } from '../actions/user'

import Login from '../components/login'

const LoginPage = connect(
    state => ({ ...state }),
    dispatch => ({
        showSpinner: () => dispatch(showSpinner()),
    }),
)(Login)

export default LoginPage

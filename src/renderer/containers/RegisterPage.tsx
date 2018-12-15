// import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { showSpinner } from '../actions/user'

import Register from '../components/register'

const RegisterPage = connect(
    state => ({ ...state }),
    dispatch => ({
        showSpinner: () => dispatch(showSpinner()),
    }),
)(Register)

export default RegisterPage

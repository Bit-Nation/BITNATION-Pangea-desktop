import { push } from 'connected-react-router'
import * as React from 'react'
import { connect } from 'react-redux'
import { showSpinner } from '../actions/user'

import Home from '../components/home'

const HomePage = connect(
    state => ({ ...state }),
    dispatch => ({
        gotoWallet: () => {
            dispatch(push('/wallet'))
        },
        showSpinner: () => dispatch(showSpinner()),
    }),
)(Home)

export default HomePage

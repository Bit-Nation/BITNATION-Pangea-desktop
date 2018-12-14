import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { showSpinner } from '../actions/user';

import Home from '../components/home';

const HomePage = connect(
    (state) => ({ ...state }),
    (dispatch) => ({
        gotoWallet: () => {
            dispatch(push('/wallet'))
        },
        showSpinner: () => dispatch(showSpinner())
    })
)(Home);

export default HomePage;
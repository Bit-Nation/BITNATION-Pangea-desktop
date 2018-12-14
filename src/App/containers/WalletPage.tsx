import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Wallet from '../components/wallet';

const WalletPage = connect(
    (state) => ({...state}),
    (dispatch) => ({
        gotoHome: () => dispatch(push('/'))
    })
)(Wallet);

export default WalletPage;
import { push } from 'connected-react-router'
import * as React from 'react'
import { connect } from 'react-redux'

import Wallet from '../components/wallet'

const WalletPage = connect(
    state => ({ ...state }),
    dispatch => ({
        gotoHome: () => dispatch(push('/')),
    }),
)(Wallet)

export default WalletPage

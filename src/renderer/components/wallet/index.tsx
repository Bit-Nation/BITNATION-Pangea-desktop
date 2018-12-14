import * as React from 'react'

interface WalletProps {
    gotoHome: Function
}
interface WalletStates {}

export default class Wallet extends React.Component<WalletProps, WalletStates> {
    render() {
        return (
            <div>
                Wallet page
                <button onClick={() => this.props.gotoHome()}>Home</button>
            </div>
        )
    }
}

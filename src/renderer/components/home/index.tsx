import * as React from 'react'

interface HomeProps {
    gotoWallet: Function
    showSpinner: Function
}
interface HomeStates {}

export default class Home extends React.Component<HomeProps, HomeStates> {
    render() {
        return (
            <div>
                Home page
                <button onClick={() => this.props.gotoWallet()}>Wallet</button>
                <button onClick={() => this.props.showSpinner()}>Show spinner</button>
            </div>
        )
    }
}

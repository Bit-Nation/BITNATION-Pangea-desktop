import * as React from 'react';

interface IWalletProps {
    gotoHome(): void;
}
interface IWalletStates {}

export default class Wallet extends React.Component<IWalletProps, IWalletStates> {
    render() {
        return (
            <div>
                Wallet page
                <button onClick={this.props.gotoHome}>Home</button>
            </div>
        );
    }
}

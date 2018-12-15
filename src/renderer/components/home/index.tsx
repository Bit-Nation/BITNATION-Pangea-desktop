import * as materialUi from '@material-ui/core';
import * as React from 'react';

const Button = materialUi.Button;

interface IHomeProps {
    gotoWallet(): void;
    showSpinner(): void;
}

interface IHomeStates {}

export default class Home extends React.Component<IHomeProps, IHomeStates> {
    render() {
        return (
            <div>
                Home page
                <Button variant="contained" color="primary" onClick={this.props.gotoWallet}>
                    Wallet
                </Button>
                <Button variant="contained" color="primary" onClick={this.props.showSpinner}>
                    Show spinner
                </Button>
            </div>
        );
    }
}

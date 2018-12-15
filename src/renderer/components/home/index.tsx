import Button from '@material-ui/core/Button'
import * as React from 'react'

interface HomeProps {
    gotoWallet: () => void
    showSpinner: () => void
}
interface HomeStates { }

export default class Home extends React.Component<HomeProps, HomeStates> {
    render() {
        console.log(this.props)
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
        )
    }
}

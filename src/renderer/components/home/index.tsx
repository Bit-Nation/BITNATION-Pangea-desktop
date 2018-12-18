import { Button, Grid, Typography, Paper } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { SPACING_PAPER, SPACING_CONTAINER, GRID_12 } from '../../utils/style';

interface IHomeProps {
    classes: any;
    gotoWallet(): void;
    logout(): void;
}

interface IHomeStates {}

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * SPACING_PAPER,
        paddingBottom: theme.spacing.unit * SPACING_PAPER,
    },
});

const LinkToChat = props => <Link to="/chat" {...props} />;

const Home = ({ classes, logout }: IHomeProps, {  }: IHomeStates) => {
    return (
        <Grid container spacing={SPACING_CONTAINER}>
            <Grid item xs={GRID_12}>
                <Typography variant="h5" align="center">
                    Home page
                </Typography>
                <Paper className={classes.root} elevation={0}>
                    <Button component={LinkToChat} variant="contained" color="primary">
                        Chat
                    </Button>{' '}
                    <Button onClick={logout} variant="contained" color="primary">
                        Logout
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default withStyles(styles)(Home);

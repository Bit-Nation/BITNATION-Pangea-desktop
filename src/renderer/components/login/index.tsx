import { Grid, Paper, TextField, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common/loading';
import Notifier from '../common/notifier';
import { ILoginProps, ILoginStates } from './interface';
import { SPACING_PAPER, SPACING_CONTAINER, GRID_12 } from '../../utils/style';
import useLoginState from './use-login-state';
import useNotifierState from './use-notifier-state';
import useValidateState from './use-validate-state';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * SPACING_PAPER,
        paddingBottom: theme.spacing.unit * SPACING_PAPER,
    },
});

const LinkToRegister = props => <Link to="/register" {...props} />;

const Login = (
    { classes, user: { isFetching, message }, login }: ILoginProps,
    {  }: ILoginStates,
) => {
    const { data, onChange } = useLoginState({
        username: '',
        password: '',
    });
    const { errors, validate, validateForm } = useValidateState({
        username: false,
        password: false,
    });
    const { isOpenNotifier, onCloseNotifier, onOpenNotifier } = useNotifierState(false);
    React.useEffect(
        () => {
            if (message !== undefined && !isOpenNotifier) {
                onOpenNotifier();
            }
        },
        [message],
    );
    return (
        <Grid container spacing={SPACING_CONTAINER}>
            <Grid item xs={GRID_12}>
                <Typography variant="h5" align="center">
                    Login
                </Typography>
                <Paper className={classes.root} elevation={0}>
                    <form>
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            onChange={e => {
                                onChange(e);
                                validate(e);
                            }}
                            value={data.username}
                            error={errors.username}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="password"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            onChange={e => {
                                onChange(e);
                                validate(e);
                            }}
                            value={data.password}
                            error={errors.password}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                const valid = validateForm(data);
                                if (valid) {
                                    login(data.username, data.password);
                                }
                            }}
                        >
                            Submit
                        </Button>
                        <Button component={LinkToRegister}>Don't have an account yet?</Button>
                    </form>

                    <Notifier
                        open={isOpenNotifier}
                        handleClose={onCloseNotifier}
                        message={message}
                    />
                    <Loading isLoading={isFetching} />
                </Paper>
            </Grid>
        </Grid>
    );
};
export default withStyles(styles)(Login);

import { Grid, Paper, TextField, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IRegisterProps, IRegisterStates } from './interface';
import { SPACING_PAPER, SPACING_CONTAINER, GRID_12 } from '../../utils/style';
import useRegisterState from './use-register-state';
import useValidateState from './use-validate-state';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * SPACING_PAPER,
        paddingBottom: theme.spacing.unit * SPACING_PAPER,
    },
});

const LinkToLogin = props => <Link to="/login" {...props} />;

const Register = (props: IRegisterProps, {  }: IRegisterStates) => {
    const { data, onChange } = useRegisterState({
        email: '',
        username: '',
        password: '',
    });
    const { errors, validate, validateForm } = useValidateState({
        email: false,
        username: false,
        password: false,
    });
    const { classes } = props;

    return (
        <Grid container spacing={SPACING_CONTAINER}>
            <Grid item xs={GRID_12}>
                <Typography variant="h5" align="center">
                    Register
                </Typography>

                <Paper className={classes.root} elevation={0}>
                    <form>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            value={data.email}
                            onChange={e => {
                                onChange(e);
                                validate(e);
                            }}
                            error={errors.email}
                        />
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            type="username"
                            name="username"
                            autoComplete="username"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            value={data.username}
                            onChange={e => {
                                onChange(e);
                                validate(e);
                            }}
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
                            value={data.password}
                            onChange={e => {
                                onChange(e);
                                validate(e);
                            }}
                            error={errors.password}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                const valid = validateForm(data);
                                if (valid) {
                                    // props.showSpinner()
                                }
                            }}
                        >
                            Submit
                        </Button>
                        <Button component={LinkToLogin}>Have an account?</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(Register);

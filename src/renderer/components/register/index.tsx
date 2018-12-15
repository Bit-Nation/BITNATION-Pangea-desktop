import Button from '@material-ui/core/Button'
import {
    Grid,
    Typography,
    Paper,
    TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { Link } from 'react-router-dom'
import {
    RegisterProps,
    RegisterStates
} from './RegisterInterface';
import useRegisterState from './useRegisterState';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
});

const LinkToLogin = props => <Link to="/login" {...props} />

const Register = ({ classes }: RegisterProps, { }: RegisterStates) => {
    const { data, errors, onChange } = useRegisterState({
        email: '',
        username: '',
        password: ''
    });
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Typography variant="h5" align="center">Register</Typography>

                <Paper className={classes.root} elevation={0}>
                    <form onSubmit={() => { }}>
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
                            error={errors.password}
                        />
                        <Button
                            variant="contained" color="primary"
                        >
                            Submit
                        </Button>
                        <Button component={LinkToLogin}>Have an account?</Button>
                    </form>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Register);
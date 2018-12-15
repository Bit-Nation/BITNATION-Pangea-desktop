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
    LoginProps,
    LoginStates
} from './LoginInterface';

import useLoginState from './useLoginState';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
})

const LinkToRegister = props => <Link to="/register" {...props} />

const Login = ({ classes }: LoginProps, { }: LoginStates) => {
    const { data, errors, onChange } = useLoginState({
        username: '',
        password: ''
    });
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Typography variant="h5" align="center">Login</Typography>

                <Paper className={classes.root} elevation={0}>
                    <form onSubmit={() => { }}>
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            onChange={onChange}
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
                            onChange={onChange}
                            value={data.password}
                            error={errors.password}
                        />
                        <Button
                            variant="contained" color="primary"
                            onClick={() => { }}
                        >
                            Submit
                        </Button>
                        <Button component={LinkToRegister}>Don't have an account yet?</Button>
                    </form>

                </Paper>
            </Grid>
        </Grid>
    )

}
export default withStyles(styles)(Login);
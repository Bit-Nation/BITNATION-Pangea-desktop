import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import * as _ from 'lodash'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { LoginProps, LoginStates } from './LoginInterface'

import useLoginState from './useLoginState'
import useValidateState from './useValidateState'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
})

const LinkToRegister = props => <Link to="/register" {...props} />

const Login = (props: LoginProps, {  }: LoginStates) => {
    const { data, onChange } = useLoginState({
        username: '',
        password: '',
    })

    const { errors, validate, validateForm } = useValidateState({
        username: false,
        password: false,
    })
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    Login
                </Typography>

                <Paper className={props.classes.root} elevation={0}>
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
                                onChange(e)
                                validate(e)
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
                                onChange(e)
                                validate(e)
                            }}
                            value={data.password}
                            error={errors.password}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                const valid = validateForm(data)
                                if (valid) {
                                    props.login(data.username, data.password)
                                }
                            }}
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
export default withStyles(styles)(Login)

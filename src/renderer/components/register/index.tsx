import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { RegisterProps, RegisterStates } from './RegisterInterface'
import useRegisterState from './useRegisterState'
import useValidateState from './useValidateState'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
})

const LinkToLogin = props => <Link to="/login" {...props} />

const Register = (props: RegisterProps, {  }: RegisterStates) => {
    const { data, onChange } = useRegisterState({
        email: '',
        username: '',
        password: '',
    })
    const { errors, validate, validateForm } = useValidateState({
        email: false,
        username: false,
        password: false,
    })
    const { classes } = props

    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    Register
                </Typography>

                <Paper className={classes.root} elevation={0}>
                    <form onSubmit={() => {}}>
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
                                onChange(e)
                                validate(e)
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
                                onChange(e)
                                validate(e)
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
                                onChange(e)
                                validate(e)
                            }}
                            error={errors.password}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                const valid = validateForm(data)
                                if (valid) {
                                    console.log('111')
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
    )
}

export default withStyles(styles)(Register)

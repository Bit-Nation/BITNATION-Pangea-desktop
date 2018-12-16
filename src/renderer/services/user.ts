import * as sdk from 'matrix-js-sdk'
import { LoginAction } from '../actions/user'
import { DEFAULT_HS_URL } from '../utils/config'
export const api = {
    login({ username, password }: LoginAction) {
        return new Promise((resolve, reject) => {
            const client = sdk.createClient(DEFAULT_HS_URL)
            client
                .login('m.login.password', { user: username, password })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

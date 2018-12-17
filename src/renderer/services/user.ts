import * as sdk from 'matrix-js-sdk';
import { ILoginAction } from '../actions/user';
import { DEFAULT_HS_URL } from '../utils/config';
export const api = {
    async login({ username, password }: ILoginAction) {
        const client = sdk.createClient(DEFAULT_HS_URL);
        return new Promise<any>((resolve: any, reject: any) => {
            client
                .login('m.login.password', { user: username, password })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
};

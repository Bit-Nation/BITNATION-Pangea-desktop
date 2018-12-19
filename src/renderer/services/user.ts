import * as sdk from 'matrix-js-sdk';
import { ILoginAction } from '../actions/user';
import { DEFAULT_HS_URL, MAX_ROOMS } from '../utils/config';
export const api = {
    async login({ username, password }: ILoginAction) {
        const client = sdk.createClient(DEFAULT_HS_URL);
        return new Promise<any>((resolve: any, reject: any) => {
            client
                .login('m.login.password', { user: username, password })
                .then(response => {
                    client.publicRooms((err: any, data: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            const rooms = data.chunk.slice(0, MAX_ROOMS).map(room => {
                                const { name, room_id } = room;
                                return {
                                    name,
                                    roomId: room_id,
                                    members: [],
                                };
                            });
                            resolve({
                                user: response,
                                rooms,
                            });
                        }
                    });
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    },
};

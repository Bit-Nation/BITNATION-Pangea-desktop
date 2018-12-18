import * as sdk from 'matrix-js-sdk';
import { IJoinRoomAction } from '../actions/chat';
import { DEFAULT_HS_URL } from '../utils/config';
export const api = {
    async joinRoom({ room }: IJoinRoomAction) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const client = sdk.createClient({
            baseUrl: DEFAULT_HS_URL,
            accessToken: user.access_token,
            userId: user.user_id,
        });
        return new Promise<string>((resolve?: any, reject?: any) => {
            client
                .joinRoom(room.room_id)
                .then((response: any) => {
                    resolve(`You joined to ${room.name}`);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    },
};

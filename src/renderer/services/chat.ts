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
                .joinRoom(room.roomId)
                .then((response: any) => {
                    resolve(`You joined to ${room.name}`);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    },
    // async getJoinedRooms({ user }: IGetJoinedRoomsAction) {
    //     return new Promise<string>((resolve?: any, reject?: any) => {
    //         axios.get(`${DEFAULT_HS_URL}/_matrix/client/unstable/joined_rooms?access_token=${user.access_token}`)
    //             .then(response => {
    //                 const {
    //                     joined_rooms
    //                 } = response.data;
    //                 resolve(joined_rooms)
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },

    // async getMessages({ room }: ISetRoomConversationAction) {
    //     const user = JSON.parse(localStorage.getItem('user') || '{}');
    //     return new Promise<string>((resolve?: any, reject?: any) => {
    //         axios.get(`${DEFAULT_HS_URL}/_matrix/client/unstable/rooms/${room.roomId}/messages?access_token=${user.access_token}&dir=b`)
    //             .then(response => {
    //                 const {
    //                     chunk
    //                 } = response.data;
    //                 const messages = chunk.map(message => {
    //                     const {
    //                         content,
    //                         type,
    //                         membership,
    //                         sender
    //                     } = message;
    //                     return {
    //                         body: type === 'm.room.message' ? content.body : `${sender} ${membership}`,
    //                         sender
    //                     }
    //                 })
    //                 resolve(messages)
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // }
};

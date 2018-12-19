import { connect } from 'react-redux';
import { IRoomType, IMessageType } from '../types/room';
import { logout } from '../actions/user';
import { receiveJoinedRooms } from '../actions/chat';
import {
    setRoomConversation,
    receiveMessageConversation,
    showSpinner,
    hideSpinner,
} from '../actions/conversation';
import Room from '../components/room';

const RoomPage = connect(
    ({ user, chat, conversation, router }: any) => ({ user, chat, conversation, router }),
    (dispatch: any) => ({
        logout: () => dispatch(logout()),
        setRoomConversation: (room: IRoomType) => dispatch(setRoomConversation(room)),
        receiveMessageConversation: (message: IMessageType) =>
            dispatch(receiveMessageConversation(message)),
        showSpinner: () => dispatch(showSpinner()),
        hideSpinner: () => dispatch(hideSpinner()),
        receiveJoinedRooms: (rooms: []) => dispatch(receiveJoinedRooms(rooms)),
    }),
)(Room);

export default RoomPage;

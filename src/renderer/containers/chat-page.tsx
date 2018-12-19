import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { IRoomType } from '../types/room';
import { logout } from '../actions/user';
import { setRoom, joinRoom, showSpinner, hideSpinner, receiveJoinedRooms } from '../actions/chat';
import { setRoomConversation } from '../actions/conversation';
import Chat from '../components/chat';

const ChatPage = connect(
    ({ user, chat }: any) => ({ user, chat }),
    (dispatch: any) => ({
        logout: () => dispatch(logout()),
        setRoom: (room: IRoomType) => dispatch(setRoom(room)),
        joinRoom: (room: IRoomType) => dispatch(joinRoom(room)),
        leaveRoom: (room: IRoomType) => {
            // console.log('leave room');
        },
        setRoomConversation: (room: IRoomType) => {
            dispatch(setRoomConversation(room));
            dispatch(push(`/room/${room.roomId}`));
        },
        receiveJoinedRooms: (rooms: []) => dispatch(receiveJoinedRooms(rooms)),
        showSpinner: () => dispatch(showSpinner()),
        hideSpinner: () => dispatch(hideSpinner()),
    }),
)(Chat);

export default ChatPage;

import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { IRoomType } from '../types/room';
import { logout } from '../actions/user';
import { setRoom, joinRoom } from '../actions/chat';
import Chat from '../components/chat';

const ChatPage = connect(
    ({ user, chat }: any) => ({ user, chat }),
    (dispatch: any) => ({
        gotoHome: () => dispatch(push('/')),
        logout: () => dispatch(logout()),
        setRoom: (room: IRoomType) => dispatch(setRoom(room)),
        joinRoom: (room: IRoomType) => dispatch(joinRoom(room)),
    }),
)(Chat);

export default ChatPage;

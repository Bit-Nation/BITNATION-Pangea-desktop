import { put, call } from 'redux-saga/effects';
import {
    showSpinner,
    hideSpinner,
    joinRoomSuccess,
    joinRoomError,
    IJoinRoomAction,
} from '../../actions/chat';
import { api } from '../../services/chat';
export function* jointRoomActionHandler(action: IJoinRoomAction) {
    yield put(showSpinner());
    try {
        const message = yield call(api.joinRoom, action);
        yield put(joinRoomSuccess(message));
        yield put(hideSpinner());
        return undefined;
    } catch (e) {
        const { message } = e;
        yield put(joinRoomError(message));
        yield put(hideSpinner());
    }
}

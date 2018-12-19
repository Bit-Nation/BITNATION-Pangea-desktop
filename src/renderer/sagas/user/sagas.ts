import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    ILoginAction,
    ILogoutAction,
    showSpinner,
    hideSpinner,
    loginSuccess,
    loginError,
} from '../../actions/user';
import { receiveRooms } from '../../actions/chat';
import { api as UserApi } from '../../services/user';

export function* loginActionHandler(action: ILoginAction) {
    yield put(showSpinner());
    try {
        const { user, rooms } = yield call(UserApi.login, action);
        yield put(loginSuccess(user));
        yield put(receiveRooms(rooms));
        yield put(hideSpinner());
        localStorage.setItem('user', JSON.stringify(user));

        yield put(push('/'));
        return user;
    } catch (e) {
        const { message } = e;
        console.log(e);
        yield put(loginError(message));
        yield put(hideSpinner());
    }
}
export function* logoutActionHandler(action: ILogoutAction) {
    yield put(showSpinner());
    try {
        yield put(hideSpinner());
        localStorage.removeItem('user');
        yield put(push('/'));
    } catch (e) {
        yield put(hideSpinner());
    }
}

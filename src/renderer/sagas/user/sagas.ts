import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    ILoginAction,
    showSpinner,
    hideSpinner,
    loginSuccess,
    loginError,
} from '../../actions/user';
import { api } from '../../services/user';

export function* loginActionHandler(action: ILoginAction) {
    yield put(showSpinner());
    try {
        const user = yield call(api.login, action);
        yield put(loginSuccess(user));
        yield put(hideSpinner());
        localStorage.setItem('user', JSON.stringify(user));
        yield put(push('/'));
        return user;
    } catch (e) {
        const { message } = e;
        yield put(loginError(message));
        yield put(hideSpinner());
    }
}

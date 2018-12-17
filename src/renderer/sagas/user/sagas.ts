import { call, put } from 'redux-saga/effects';
import { ILoginAction, showSpinner, hideSpinner } from '../../actions/user';
import { api } from '../../services/user';

export function* loginActionHandler(action: ILoginAction) {
    yield put(showSpinner());
    try {
        const user = yield call(api.login, action);
        yield put(hideSpinner());
        return user;
    } catch (e) {
        yield put(hideSpinner());
    }
}

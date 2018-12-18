import { all, takeEvery } from 'redux-saga/effects';
import { USER_LOGIN, USER_LOGOUT } from '../../actions/user';
import { loginActionHandler, logoutActionHandler } from './sagas';
/**
 * @desc Root activity saga.
 */
export default function* userRootSaga() {
    yield all([
        takeEvery(USER_LOGIN, loginActionHandler),
        takeEvery(USER_LOGOUT, logoutActionHandler),
    ]);
}

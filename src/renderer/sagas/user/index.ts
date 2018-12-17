import { all, takeEvery } from 'redux-saga/effects';
import { USER_LOGIN } from '../../actions/user';
import { loginActionHandler } from './sagas';
/**
 * @desc Root activity saga.
 */
export default function* userRootSaga() {
    yield all([takeEvery(USER_LOGIN, loginActionHandler)]);
}

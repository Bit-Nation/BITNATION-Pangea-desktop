import { all, takeEvery } from 'redux-saga/effects'

import { USER_LOGIN } from '../../actions/user'
import { login } from './sagas'

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
    yield all([takeEvery(USER_LOGIN, login)])
}

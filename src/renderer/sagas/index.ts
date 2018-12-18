import { all, call } from 'redux-saga/effects';

import userRootSaga from './user';
import chatRootSaga from './chat';
/**
 * @desc Root saga.
 */
export default function* rootSaga() {
    yield all([call(userRootSaga), call(chatRootSaga)]);
}

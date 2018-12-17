import { all, call } from 'redux-saga/effects';

import userRootSaga from './user';

/**
 * @desc Root saga.
 */
export default function* rootSaga() {
    yield all([call(userRootSaga)]);
}

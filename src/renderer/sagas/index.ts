import { all, call } from 'redux-saga/effects';

import user from './user';

/**
 * @desc Root saga.
 */
export default function* rootSaga() {
    yield all([call(user)]);
}

import { all, call } from 'redux-saga/effects';

import user from './user';

/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga(){
  yield all([
    call(user),
  ]);
}

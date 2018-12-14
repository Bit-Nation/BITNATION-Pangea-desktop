import { all, takeEvery } from 'redux-saga/effects';

import {
    SHOW_USER_SPINNER,
} from '../../actions/user';
import {
    showSpinnerActionHandler,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
    yield all([
        takeEvery(SHOW_USER_SPINNER, showSpinnerActionHandler),
    ]);
}

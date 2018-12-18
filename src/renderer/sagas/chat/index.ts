import { all, takeEvery } from 'redux-saga/effects';
import { JOIN_ROOM } from '../../actions/chat';
import { jointRoomActionHandler } from './sagas';
/**
 * @desc Root activity saga.
 */
export default function* chatRootSaga() {
    yield all([takeEvery(JOIN_ROOM, jointRoomActionHandler)]);
}

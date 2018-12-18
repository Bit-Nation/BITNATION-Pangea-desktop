import {
    Action,
    RECEIVE_ROOMS,
    SET_ROOM,
    HIDE_CHAT_SPINNER,
    SHOW_CHAT_SPINNER,
    JOIN_ROOM_ERROR,
    JOIN_ROOM_SUCCESS,
} from '../actions/chat';
import { LOCATION_CHANGE } from 'react-router-redux';

export interface IState {
    isFetching: boolean;
    joinedRooms: [] | undefined;
    message: string | undefined;
    room: {} | undefined;
    rooms: [] | undefined;
}

export const initialState: IState = {
    isFetching: false,
    rooms: undefined,
    room: undefined,
    message: undefined,
    joinedRooms: undefined,
};

/**
 * @desc Activity reducer.
 * @param {IState} state Current state.
 * @param {Action} action Performed action.
 * @returns {IState} Next state.
 */
export default (state: IState = initialState, action: Action): IState => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return { ...state, room: undefined, isFetching: false, message: undefined };
        case RECEIVE_ROOMS:
            return { ...state, rooms: action.rooms };
        case JOIN_ROOM_ERROR:
            return { ...state, message: action.message };
        case JOIN_ROOM_SUCCESS:
            return { ...state, message: action.message };
        case SET_ROOM:
            return { ...state, room: action.room };
        case SHOW_CHAT_SPINNER:
            return { ...state, isFetching: true };
        case HIDE_CHAT_SPINNER:
            return { ...state, isFetching: false };
        default:
            return state;
    }
};

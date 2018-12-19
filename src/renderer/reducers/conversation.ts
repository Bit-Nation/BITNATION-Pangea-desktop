import {
    Action,
    SHOW_CONVERSATION_SPINNER,
    HIDE_CONVERSATION_SPINNER,
    SET_ROOM_CONVERSATION,
    RECEIVE_MESSAGES_CONVERSATION,
    RECEIVE_MESSAGE_CONVERSATION,
} from '../actions/conversation';
import { LOCATION_CHANGE } from 'react-router-redux';

export interface IState {
    isFetching: boolean;
    messages: any[];
    room: {} | undefined;
}

export const initialState: IState = {
    isFetching: false,
    messages: [],
    room: undefined,
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
            return { ...state, messages: [] };
        case RECEIVE_MESSAGES_CONVERSATION:
            return { ...state, messages: action.messages };
        case RECEIVE_MESSAGE_CONVERSATION:
            const { messages } = state;
            const { message } = action;
            return { ...state, messages: messages.concat([message]) };
        case SET_ROOM_CONVERSATION:
            return { ...state, messages: [], room: action.room };
        case SHOW_CONVERSATION_SPINNER:
            return { ...state, isFetching: true };
        case HIDE_CONVERSATION_SPINNER:
            return { ...state, isFetching: false };
        default:
            return state;
    }
};

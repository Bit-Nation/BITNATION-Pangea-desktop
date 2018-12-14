import {
    Action,
    SHOW_USER_SPINNER,
    HIDE_USER_SPINNER,
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER,
} from '../actions/user';
import { UserType } from '../types/User';

export type State = {
    isFetching: boolean,
    user: UserType | null,
};

export const initialState: State = {
    isFetching: false,
    user: null,
};

/**
 * @desc Activity reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SHOW_USER_SPINNER:
            return { ...initialState, isFetching: true };
        default:
            return initialState;
    }
};
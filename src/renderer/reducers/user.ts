import {
    Action,
    SHOW_USER_SPINNER,
    USER_LOGIN_SUCCESS,
    HIDE_USER_SPINNER,
    USER_LOGIN_ERROR,
} from '../actions/user';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IUserType } from '../types/user';

export interface IState {
    isFetching: boolean;
    message: string | undefined;
    user: IUserType | undefined;
}

export const initialState: IState = {
    isFetching: false,
    user: undefined,
    message: undefined,
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
            return { ...state, message: undefined };
        case USER_LOGIN_SUCCESS:
            return { ...state, user: action.user };
        case USER_LOGIN_ERROR:
            return { ...state, message: action.message };
        case SHOW_USER_SPINNER:
            return { ...state, isFetching: true };
        case HIDE_USER_SPINNER:
            return { ...state, isFetching: false };
        default:
            return initialState;
    }
};

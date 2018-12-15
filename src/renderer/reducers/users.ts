import { Action, SHOW_USER_SPINNER } from '../actions/user';
import { IUserType } from '../types/User';

export interface IState {
    isFetching: boolean;
    user: IUserType | undefined;
}

export const initialState: IState = {
    isFetching: false,
    user: undefined,
};

/**
 * @desc Activity reducer.
 * @param {IState} state Current state.
 * @param {Action} action Performed action.
 * @returns {IState} Next state.
 */
export default (state: IState = initialState, action: Action): IState => {
    switch (action.type) {
        case SHOW_USER_SPINNER:
            return { ...initialState, isFetching: true };
        default:
            return initialState;
    }
};

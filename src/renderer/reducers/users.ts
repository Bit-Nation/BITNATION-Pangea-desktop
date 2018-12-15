import { Action, SHOW_USER_SPINNER } from '../actions/user'
import { UserType } from '../types/User'

export interface State {
    isFetching: boolean
    user: UserType | null
}

export const initialState: State = {
    isFetching: false,
    user: null,
}

/**
 * @desc Activity reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SHOW_USER_SPINNER:
            return { ...initialState, isFetching: true }
        default:
            return initialState
    }
}

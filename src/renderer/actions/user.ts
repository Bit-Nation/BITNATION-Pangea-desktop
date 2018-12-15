export const SHOW_USER_SPINNER = 'SHOW_USER_SPINNER'
export const HIDE_USER_SPINNER = 'HIDE_USER_SPINNER'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_REGISTER = 'USER_REGISTER'

export interface ShowSpinnerAction {
    type: 'SHOW_USER_SPINNER'
}
export interface HideSpinnerAction {
    type: 'HIDE_USER_SPINNER'
}
export interface LoginAction {
    type: 'USER_LOGIN'
}
export interface LogoutAction {
    type: 'USER_LOGOUT'
}
export interface RegisterAction {
    type: 'USER_REGISTER'
}

export type Action = ShowSpinnerAction | HideSpinnerAction

/**
 * @desc Action for an action that shows spinner while processing in background
 * @returns {ShowSpinnerAction} An action
 */
export function showSpinner(): ShowSpinnerAction {
    return {
        type: SHOW_USER_SPINNER,
    }
}

/**
 * @desc Action for an action that hide spinner after the process is completed
 * @returns {HideSpinnerAction} An action
 */
export function hideSpinner(): HideSpinnerAction {
    return {
        type: HIDE_USER_SPINNER,
    }
}

export const SHOW_USER_SPINNER = 'SHOW_USER_SPINNER';
export const HIDE_USER_SPINNER = 'HIDE_USER_SPINNER';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTER = 'USER_REGISTER';

export interface IShowSpinnerAction {
    type: 'SHOW_USER_SPINNER';
}
export interface IHideSpinnerAction {
    type: 'HIDE_USER_SPINNER';
}
export interface ILoginAction {
    password: string;
    type: 'USER_LOGIN';
    username: string;
}
export interface ILogoutAction {
    type: 'USER_LOGOUT';
}
export interface IRegisterAction {
    type: 'USER_REGISTER';
}

export type Action = IShowSpinnerAction | IHideSpinnerAction | ILoginAction;

export function login(username: string, password: string): ILoginAction {
    return {
        type: USER_LOGIN,
        username,
        password,
    };
}

export function showSpinner(): IShowSpinnerAction {
    return {
        type: SHOW_USER_SPINNER,
    };
}

export function hideSpinner(): IHideSpinnerAction {
    return {
        type: HIDE_USER_SPINNER,
    };
}

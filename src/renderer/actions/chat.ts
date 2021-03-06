import { IRoomType } from '../types/room';
import { IUserType } from '../types/user';
export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const SHOW_CHAT_SPINNER = 'SHOW_CHAT_SPINNER';
export const HIDE_CHAT_SPINNER = 'HIDE_CHAT_SPINNER';
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
export const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
export const SET_ROOM = 'SET_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const RECEIVE_JOINED_ROOMS = 'RECEIVE_JOINED_ROOMS';

export interface IShowSpinnerAction {
    type: 'SHOW_CHAT_SPINNER';
}
export interface IHideSpinnerAction {
    type: 'HIDE_CHAT_SPINNER';
}
export interface IReceiveRoomsAction {
    rooms: any[];
    type: 'RECEIVE_ROOMS';
}
export interface IReceiveJoinedRoomsAction {
    joinedRooms: any[];
    type: 'RECEIVE_JOINED_ROOMS';
}
export interface IGetJoinedRoomsAction {
    type: 'GET_JOINED_ROOMS';
    user: IUserType;
}
export interface IJoinRoomSuccessAction {
    message: string;
    type: 'JOIN_ROOM_SUCCESS';
}
export interface IJoinRoomErrorAction {
    message: string;
    type: 'JOIN_ROOM_ERROR';
}
export interface ISetRoomAction {
    room: IRoomType;
    type: 'SET_ROOM';
}
export interface IJoinRoomAction {
    room: IRoomType;
    type: 'JOIN_ROOM';
}
export type Action =
    | IShowSpinnerAction
    | IHideSpinnerAction
    | IReceiveRoomsAction
    | IJoinRoomErrorAction
    | IJoinRoomSuccessAction
    | ISetRoomAction
    | IJoinRoomAction
    | IReceiveJoinedRoomsAction
    | IGetJoinedRoomsAction;

export function receiveRooms(rooms: []): IReceiveRoomsAction {
    return {
        type: RECEIVE_ROOMS,
        rooms,
    };
}

export function receiveJoinedRooms(joinedRooms: []): IReceiveJoinedRoomsAction {
    return {
        type: RECEIVE_JOINED_ROOMS,
        joinedRooms,
    };
}

export function setRoom(room: IRoomType): ISetRoomAction {
    return {
        type: SET_ROOM,
        room,
    };
}

export function joinRoom(room: IRoomType): IJoinRoomAction {
    return {
        type: JOIN_ROOM,
        room,
    };
}

export function joinRoomSuccess(message: string): IJoinRoomSuccessAction {
    return {
        type: JOIN_ROOM_SUCCESS,
        message,
    };
}

export function joinRoomError(message: string): IJoinRoomErrorAction {
    return {
        type: JOIN_ROOM_ERROR,
        message,
    };
}

export function showSpinner(): IShowSpinnerAction {
    return {
        type: SHOW_CHAT_SPINNER,
    };
}

export function hideSpinner(): IHideSpinnerAction {
    return {
        type: HIDE_CHAT_SPINNER,
    };
}

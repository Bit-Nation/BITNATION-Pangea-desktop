import { IRoomType, IMessageType } from '../types/room';
export const SHOW_CONVERSATION_SPINNER = 'SHOW_CONVERSATION_SPINNER';
export const HIDE_CONVERSATION_SPINNER = 'HIDE_CONVERSATION_SPINNER';
export const SET_ROOM_CONVERSATION = 'SET_ROOM_CONVERSATION';
export const RECEIVE_MESSAGES_CONVERSATION = 'RECEIVE_MESSAGES_CONVERSATION';
export const RECEIVE_MESSAGE_CONVERSATION = 'RECEIVE_MESSAGE_CONVERSATION';
export interface IShowSpinnerAction {
    type: 'SHOW_CONVERSATION_SPINNER';
}
export interface IHideSpinnerAction {
    type: 'HIDE_CONVERSATION_SPINNER';
}
export interface ISetRoomConversationAction {
    room: IRoomType;
    type: 'SET_ROOM_CONVERSATION';
}
export interface IReceiveMessagesConversationAction {
    messages: [];
    type: 'RECEIVE_MESSAGES_CONVERSATION';
}
export interface IReceiveMessageConversationAction {
    message: IMessageType;
    type: 'RECEIVE_MESSAGE_CONVERSATION';
}
export type Action =
    | IShowSpinnerAction
    | IHideSpinnerAction
    | ISetRoomConversationAction
    | IReceiveMessagesConversationAction
    | IReceiveMessageConversationAction;

export function receiveMessagesConversation(messages: any): IReceiveMessagesConversationAction {
    return {
        type: RECEIVE_MESSAGES_CONVERSATION,
        messages,
    };
}
export function receiveMessageConversation(
    message: IMessageType,
): IReceiveMessageConversationAction {
    return {
        type: RECEIVE_MESSAGE_CONVERSATION,
        message,
    };
}
export function setRoomConversation(room: IRoomType): ISetRoomConversationAction {
    return {
        type: SET_ROOM_CONVERSATION,
        room,
    };
}
export function showSpinner(): IShowSpinnerAction {
    return {
        type: SHOW_CONVERSATION_SPINNER,
    };
}
export function hideSpinner(): IHideSpinnerAction {
    return {
        type: HIDE_CONVERSATION_SPINNER,
    };
}

import { IRoomType, IMessageType } from '../../types/room';

export interface IRoomProps {
    chat: any;
    classes: any;
    conversation: any;
    router: any;
    user: any;
    hideSpinner(): void;
    logout(): void;
    receiveJoinedRooms(rooms: any[]): void;
    receiveMessageConversation(message: IMessageType): void;
    setRoomConversation(room: IRoomType): void;
    showSpinner(): void;
}
export interface IRoomStates {}

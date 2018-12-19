import { IRoomType } from '../../types/room';

export interface IChatProps {
    chat: any;
    classes: any;
    user: any;
    hideSpinner(): void;
    joinRoom(room: IRoomType): void;
    leaveRoom(room: IRoomType): void;
    logout(): void;
    receiveJoinedRooms(rooms: any[]): void;
    setRoom(room: IRoomType): void;
    setRoomConversation(room: IRoomType): void;
    showSpinner(): void;
}
export interface IChatStates {}

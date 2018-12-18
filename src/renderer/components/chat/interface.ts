import { IRoomType } from '../../types/room';
import { IUserType } from '../../types/user';

export interface IChatProps {
    chat: any;
    classes: any;
    user: IUserType;
    joinRoom(room: IRoomType): void;
    logout(): void;
    setRoom(room: IRoomType): void;
}
export interface IChatStates {}

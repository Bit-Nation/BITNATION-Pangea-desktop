import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user, { IState as UserState } from './user';
import chat from './chat';
import conversation from './conversation';

export interface IState {
    user: UserState;
}

export const subReducers = {
    user,
    chat,
    conversation,
};
export default (history: any) =>
    combineReducers({
        router: connectRouter(history),
        ...subReducers,
    });

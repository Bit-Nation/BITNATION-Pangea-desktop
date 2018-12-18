import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user, { IState as UserState } from './user';
import chat from './chat';
export interface IState {
    user: UserState;
}

export const subReducers = {
    user,
    chat,
};
export default (history: any) =>
    combineReducers({
        router: connectRouter(history),
        ...subReducers,
    });

import { combineReducers } from 'redux';
import users, { IState as UsersState } from './users';
export interface IState {
    users: UsersState;
}

export const subReducers = {
    users,
};

export default combineReducers(subReducers);

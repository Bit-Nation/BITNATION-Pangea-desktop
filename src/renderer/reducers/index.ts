import { combineReducers } from 'redux'
import users, { State as UsersState } from './users'
export interface State {
    users: UsersState
}

export const subReducers = {
    users,
}

export default combineReducers(subReducers)

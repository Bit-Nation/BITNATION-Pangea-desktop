import { call, put, takeLatest } from 'redux-saga/effects'
import { LoginAction, showSpinner } from '../../actions/user'
import { api } from '../../services/user'
/**
 * @desc Takes login action and calls perform login with corresponding parameters.
 * @param {LoginAction} action An action
 * @return {void}
 */
export function* login(action: LoginAction) {
    yield put(showSpinner())
    try {
        const user = yield call(api.login, action)
        console.log(user)
    } catch (e) {
        console.log(e)
    }
    return {}
}

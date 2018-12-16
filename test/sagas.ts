// import test from 'tape'
// import { put } from 'redux-saga/effects'
// import { cloneableGenerator } from '@redux-saga/testing-utils';

// import {
//     login as loginActionCreator
// } from '../src/renderer/sagas/user/sagas'
// import { USER_LOGIN } from '../src/renderer/actions/user'
// const username = 'testUser';
// const password = 'testPassword';
// const loginAction = loginActionCreator({ type: USER_LOGIN, username, password });
// test('login flow', t => {
//     const generator = cloneableGenerator(login)(loginAction)

//     t.deepEqual(generator.next().value, put({ type: 'INCREMENT' }), 'counter Saga must dispatch an INCREMENT action')

//     t.deepEqual(generator.next(), { done: true, value: undefined }, 'counter Saga must be done')

//     t.end()
// })

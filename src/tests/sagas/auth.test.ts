/* eslint-disable arrow-body-style */
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { loading } from '../../store/reducers/loadingReducer';
import { signInInit, signInSuccess, signOut } from '../../store/reducers/authReducer';
import { signInSaga } from '../../store/sagas/auth';
import api from '../../api';

describe('Auth Sagas', () => {
  it('signInSaga signs in user', () => {
    return expectSaga(signInSaga, { type: signInInit.type, payload: 'token' })
      .put(loading())
      .put(signInSuccess({
        email: 'john@encora.com',
        _id: 'abcd12345',
      }))
      .put(loading())
      .run();
  });

  it('signInSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(signInSaga, { type: signInInit.type, payload: 'token' })
      .provide([
        [matchers.call.fn(api.signIn), throwError(error)],
      ])
      .put(loading())
      .put(signOut())
      .put(loading())
      .run();
  });
});

/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/naming-convention */
import { AnyAction } from '@reduxjs/toolkit';
import * as Effects from 'redux-saga/effects';
import Cookies from 'js-cookie';
import { loading } from '../reducers/loadingReducer';
import { signInSuccess, signOut } from '../reducers/authReducer';
import api from '../../api';

const { call, put }: any = Effects;

export function* signInSaga(action: AnyAction): Generator<any, any, any> {
  yield put(loading());
  try {
    const data = yield call(api.signIn, action.payload);
    yield put(signInSuccess(data));
    yield put(loading());
  } catch (e) {
    console.error('Google Auth Error: ', e);
    yield put(signOut());
    Cookies.remove('access_token');
    yield put(loading());
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
import { AnyAction } from '@reduxjs/toolkit';
import * as Effects from 'redux-saga/effects';
import {
  createFolderSuccess,
  createFolderFail,
  fetchFoldersSuccess,
  fetchFoldersFail,
  updateFolderSuccess,
  updateFolderFail,
  deleteFolderSuccess,
  deleteFolderFail,
} from '../reducers/foldersReducer';
import { loading } from '../reducers/loadingReducer';
import api from '../../api';

const { call, put }: any = Effects;

export function* fetchFoldersSaga(): Generator<any, any, any> {
  yield put(loading());
  try {
    const data = yield call(api.getFolders);
    yield put(fetchFoldersSuccess(data.data));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(fetchFoldersFail());
  }
}

export function* createFolderSaga(action: AnyAction): Generator<any, any, any> {
  yield put(loading());
  try {
    const data = yield call(api.createFolder, { name: action.payload.name });
    yield put(createFolderSuccess(data.data));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(createFolderFail());
  }
}

export function* updateFolderSaga(action: AnyAction): Generator<any, any, any> {
  const { name, _id } = action.payload;
  console.log('action payload', action);
  yield put(loading());
  try {
    const data = yield call(api.updateFolder, { name }, _id);
    yield put(updateFolderSuccess({ ...data.data, _id }));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(updateFolderFail());
  }
}

export function* deleteFolderSaga(action: AnyAction): Generator<any, any, any> {
  const id = action.payload;
  yield put(loading());
  try {
    yield call(api.deleteFolder, id);
    yield put(deleteFolderSuccess(action.payload));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(deleteFolderFail());
  }
}

/* eslint-disable import/prefer-default-export */
import { put } from 'redux-saga/effects';
import {
  createFolderSuccess, createFolderFail, fetchFoldersSuccess, fetchFoldersFail, loading,
} from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

export function* fetchFoldersSaga() {
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders`);
    const data = yield response.json();
    yield put(loading());
    yield put(fetchFoldersSuccess(data.data));
  } catch (e) {
    yield put(loading());
    yield put(fetchFoldersFail());
  }
}

export function* createFolderSaga(action) {
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: action.payload.name }),
    });
    const data = yield response.json();
    yield put(loading());
    yield put(createFolderSuccess(data.data));
  } catch (e) {
    yield put(loading());
    yield put(createFolderFail());
  }
}

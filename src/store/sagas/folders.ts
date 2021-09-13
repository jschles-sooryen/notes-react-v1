import { AnyAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import {
  createFolderSuccess,
  createFolderFail,
  fetchFoldersSuccess,
  fetchFoldersFail,
  updateFolderSuccess,
  updateFolderFail,
  deleteFolderSuccess,
  deleteFolderFail,
  loading,
} from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

export function* fetchFoldersSaga(): Generator<any, any, any> {
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders`);
    const data = yield response.json();
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
    const response = yield fetch(`${domain}/api/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: action.payload.name }),
    });
    const data = yield response.json();
    yield put(createFolderSuccess(data.data));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(createFolderFail());
  }
}

export function* updateFolderSaga(action: AnyAction): Generator<any, any, any> {
  const { name, id } = action.payload;
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = yield response.json();
    yield put(updateFolderSuccess({ ...data.data, id }));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(updateFolderFail());
  }
}

export function* deleteFolderSaga(action: AnyAction): Generator<any, any, any> {
  yield put(loading());
  try {
    yield fetch(`${domain}/api/folders/${action.payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(deleteFolderSuccess(action.payload));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(deleteFolderFail());
  }
}

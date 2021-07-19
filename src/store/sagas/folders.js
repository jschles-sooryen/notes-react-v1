import { put } from 'redux-saga/effects';
import {
  createFolderSuccess,
  createFolderFail,
  fetchFoldersSuccess,
  fetchFoldersFail,
  deleteFolderSuccess,
  deleteFolderFail,
  loading,
} from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

export function* fetchFoldersSaga() {
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
    yield put(createFolderSuccess(data.data));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(createFolderFail());
  }
}

export function* deleteFolderSaga(action) {
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

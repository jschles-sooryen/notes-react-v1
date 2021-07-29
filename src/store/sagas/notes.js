/* eslint-disable import/prefer-default-export */
import { put, select } from 'redux-saga/effects';
import {
  fetchNotesSuccess,
  fetchNotesFail,
  createNoteSuccess,
  createNoteFail,
  loading,
} from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

function* getFolderId() {
  return yield select((state) => state.folders.selected);
}

export function* fetchNotesSaga(action) {
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders/${action.payload}/notes`);
    const data = yield response.json();
    yield put(fetchNotesSuccess(data.data));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(fetchNotesFail());
  }
}

export function* createNoteSaga(action) {
  const folderId = yield getFolderId();
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders/${folderId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: action.payload.name,
        description: action.payload.description,
      }),
    });
    const data = yield response.json();
    yield put(createNoteSuccess(data.data));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(createNoteFail());
  }
}

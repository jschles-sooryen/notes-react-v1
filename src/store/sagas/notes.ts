/* eslint-disable import/prefer-default-export */
import { AnyAction } from 'redux';
import { put, select } from 'redux-saga/effects';
import {
  fetchNotesSuccess,
  fetchNotesFail,
  createNoteSuccess,
  createNoteFail,
  updateNoteSuccess,
  updateNoteFail,
  deleteNoteSuccess,
  deleteNoteFail,
  loading,
} from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

function* getFolderId(): Generator<any, any, any> {
  return yield select((state) => state.folders.selected);
}

function* getNoteId(): Generator<any, any, any> {
  return yield select((state) => state.notes.selected);
}

export function* fetchNotesSaga(action: AnyAction): Generator<any, any, any> {
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

export function* createNoteSaga(action: AnyAction): Generator<any, any, any> {
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

export function* updateNoteSaga(action: AnyAction): Generator<any, any, any> {
  const folderId = yield getFolderId();
  const noteId = yield getNoteId();
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders/${folderId}/notes/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: action.payload.name,
        description: action.payload.description,
      }),
    });
    const data = yield response.json();
    yield put(updateNoteSuccess({ ...data.data, id: noteId }));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(updateNoteFail());
  }
}

export function* deleteNoteSaga(): Generator<any, any, any> {
  const folderId = yield getFolderId();
  const noteId = yield getNoteId();

  yield put(loading());
  try {
    yield fetch(`${domain}/api/folders/${folderId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(deleteNoteSuccess(noteId));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(deleteNoteFail());
  }
}

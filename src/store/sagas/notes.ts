/* eslint-disable import/prefer-default-export */
import { AnyAction } from '@reduxjs/toolkit';
import * as Effects from 'redux-saga/effects';
import {
  fetchNotesSuccess,
  fetchNotesFail,
  createNoteSuccess,
  createNoteFail,
  updateNoteSuccess,
  updateNoteFail,
  deleteNoteSuccess,
  deleteNoteFail,
} from '../reducers/notesReducer';
import { loading } from '../reducers/loadingReducer';
import { RootState } from '../types';
import api from '../../api';

const { call, put, select }: any = Effects;

function* getFolderId(): Generator<any, any, any> {
  return yield select((state: RootState) => state.folders.selected);
}

function* getNoteId(): Generator<any, any, any> {
  return yield select((state: RootState) => state.notes.selected);
}

export function* fetchNotesSaga(action: AnyAction): Generator<any, any, any> {
  yield put(loading());
  try {
    const folderId = action.payload;
    const data = yield call(api.getNotes, folderId);
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
    const params = {
      name: action.payload.name,
      description: action.payload.description,
      id: folderId,
    };
    const data = yield call(api.createNote, params);
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
    const params = {
      name: action.payload.name,
      description: action.payload.description,
      folderId,
      noteId,
    };
    const data = yield call(api.updateNote, params);
    yield put(updateNoteSuccess({ ...data.data, id: noteId }));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(updateNoteFail());
  }
}

export function* deleteNoteSaga(): Generator<any, any, any> {
  const noteId = yield getNoteId();

  yield put(loading());
  try {
    yield call(api.deleteNote, { noteId });
    yield put(deleteNoteSuccess(noteId));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(deleteNoteFail());
  }
}

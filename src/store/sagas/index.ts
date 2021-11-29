import { all, takeEvery } from 'redux-saga/effects';
import {
  fetchFoldersSaga,
  createFolderSaga,
  updateFolderSaga,
  deleteFolderSaga,
} from './folders';
import {
  fetchNotesSaga, createNoteSaga, updateNoteSaga, deleteNoteSaga,
} from './notes';
import { signInSaga } from './auth';
import {
  fetchFoldersInit, createFolderInit, updateFolderInit, deleteFolderInit,
} from '../reducers/foldersReducer';
import {
  fetchNotesInit, createNoteInit, updateNoteInit, deleteNoteInit,
} from '../reducers/notesReducer';
import { signInInit } from '../reducers/authReducer';

function* watchFolders() {
  yield takeEvery(fetchFoldersInit.type, fetchFoldersSaga);
  yield takeEvery(createFolderInit.type, createFolderSaga);
  yield takeEvery(updateFolderInit.type, updateFolderSaga);
  yield takeEvery(deleteFolderInit.type, deleteFolderSaga);
}

function* watchNotes() {
  yield takeEvery(fetchNotesInit.type, fetchNotesSaga);
  yield takeEvery(createNoteInit.type, createNoteSaga);
  yield takeEvery(updateNoteInit.type, updateNoteSaga);
  yield takeEvery(deleteNoteInit.type, deleteNoteSaga);
}

function* watchAuth() {
  yield takeEvery(signInInit.type, signInSaga);
}

export default function* rootSaga() {
  yield all([watchFolders(), watchNotes(), watchAuth()]);
}

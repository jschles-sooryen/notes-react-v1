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
import {
  FETCH_FOLDERS_INIT,
  CREATE_FOLDER_INIT,
  UPDATE_FOLDER_INIT,
  DELETE_FOLDER_INIT,
  FETCH_NOTES_INIT,
  CREATE_NOTE_INIT,
  UPDATE_NOTE_INIT,
  DELETE_NOTE_INIT,
} from '../actions/types';

function* watchFolders() {
  yield takeEvery(FETCH_FOLDERS_INIT, fetchFoldersSaga);
  yield takeEvery(CREATE_FOLDER_INIT, createFolderSaga);
  yield takeEvery(UPDATE_FOLDER_INIT, updateFolderSaga);
  yield takeEvery(DELETE_FOLDER_INIT, deleteFolderSaga);
}

function* watchNotes() {
  yield takeEvery(FETCH_NOTES_INIT, fetchNotesSaga);
  yield takeEvery(CREATE_NOTE_INIT, createNoteSaga);
  yield takeEvery(UPDATE_NOTE_INIT, updateNoteSaga);
  yield takeEvery(DELETE_NOTE_INIT, deleteNoteSaga);
}

export default function* rootSaga() {
  yield all([watchFolders(), watchNotes()]);
}

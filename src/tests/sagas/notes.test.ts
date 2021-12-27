/* eslint-disable arrow-body-style */
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { loading } from '../../store/reducers/loadingReducer';
import {
  fetchNotesInit,
  fetchNotesSuccess,
  fetchNotesFail,
  createNoteInit,
  createNoteSuccess,
  createNoteFail,
  updateNoteInit,
  updateNoteSuccess,
  updateNoteFail,
  deleteNoteSuccess,
  deleteNoteFail,
} from '../../store/reducers/notesReducer';
import {
  fetchNotesSaga,
  createNoteSaga,
  updateNoteSaga,
  deleteNoteSaga,
} from '../../store/sagas/notes';
import { selectSelectedFolder } from '../../store/selectors/folders';
import { selectSelectedNote } from '../../store/selectors/notes';
import api from '../../api';

describe('Notes Sagas', () => {
  it('fetchNotesSaga fetches user\'s notes from server', () => {
    return expectSaga(fetchNotesSaga, { type: fetchNotesInit.type, payload: '1' })
      .put(loading())
      .put(fetchNotesSuccess(
        [
          {
            _id: '1',
            name: 'Note 1',
            description: 'Hi',
            folder: '1',
            createdAt: '2021-09-13T14:46:40.000Z',
            updatedAt: '2021-09-13T14:46:40.000Z',
          },
          {
            _id: '2',
            name: 'Note 2',
            description: 'Hello',
            folder: '1',
            createdAt: '2021-09-13T14:46:47.000Z',
            updatedAt: '2021-09-13T14:46:47.000Z',
          },
        ],
      ))
      .put(loading())
      .run();
  });

  it('fetchNotesSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchNotesSaga, { type: fetchNotesInit.type, payload: '1' })
      .provide([
        [matchers.call.fn(api.getNotes), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(fetchNotesFail())
      .run();
  });

  it('createNoteSaga creates a new note', () => {
    return expectSaga(
      createNoteSaga,
      {
        type: createNoteInit.type,
        payload: {
          name: 'Note',
          description: 'Description',
        },
      },
    )
      .provide([
        [select(selectSelectedFolder), '1'],
      ])
      .put(loading())
      .put(createNoteSuccess(
        {
          name: 'Note',
          description: 'Description',
          _id: '3',
          folder: '1',
        },
      ))
      .put(loading())
      .run();
  });

  it('createNoteSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(
      createNoteSaga,
      {
        type: createNoteInit.type,
        payload: {
          name: 'Note',
          description: 'Description',
        },
      },
    )
      .provide([
        [select(selectSelectedFolder), '1'],
        [matchers.call.fn(api.createNote), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(createNoteFail())
      .run();
  });

  it('updateNoteSaga updates existing note', () => {
    return expectSaga(
      updateNoteSaga,
      {
        type: updateNoteInit.type,
        payload: {
          name: 'Updated Note',
          description: 'Updated Description',
        },
      },
    )
      .provide([
        [select(selectSelectedFolder), '1'],
        [select(selectSelectedNote), '1'],
      ])
      .put(loading())
      .put(updateNoteSuccess(
        {
          name: 'Updated Note',
          description: 'Updated Description',
          id: '1',
        },
      ))
      .put(loading())
      .run();
  });

  it('updateNotesSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(
      updateNoteSaga,
      {
        type: updateNoteInit.type,
        payload: {
          name: 'Updated Note',
          description: 'Updated Description',
        },
      },
    )
      .provide([
        [select(selectSelectedFolder), '1'],
        [select(selectSelectedNote), '1'],
        [matchers.call.fn(api.updateNote), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(updateNoteFail())
      .run();
  });

  it('deleteNoteSaga deletes a note', () => {
    return expectSaga(deleteNoteSaga)
      .provide([
        [select(selectSelectedNote), '1'],
      ])
      .put(loading())
      .put(deleteNoteSuccess('1'))
      .put(loading())
      .run();
  });

  it('deleteNoteSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(deleteNoteSaga)
      .provide([
        [select(selectSelectedNote), '1'],
        [matchers.call.fn(api.deleteNote), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(deleteNoteFail())
      .run();
  });
});

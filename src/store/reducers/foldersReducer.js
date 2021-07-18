import { CREATE_FOLDER_SUCCESS, FETCH_FOLDERS_SUCCESS } from '../actions/types';

const initialState = [];

function foldersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOLDERS_SUCCESS:
      return action.payload;
    case CREATE_FOLDER_SUCCESS:
      return state.concat(action.payload);
    default:
      return state;
  }
}

export default foldersReducer;

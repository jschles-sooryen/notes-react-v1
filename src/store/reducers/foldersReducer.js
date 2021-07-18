import { CREATE_FOLDER_SUCCESS, FETCH_FOLDERS_SUCCESS } from '../actions/types';

const initialState = {
  folders: [],
  selected: null,
};

function foldersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOLDERS_SUCCESS:
      return { folders: action.payload, selected: state.selected || action.payload[0].id };
    case CREATE_FOLDER_SUCCESS:
      return {
        folders: state.concat(action.payload),
        selected: state.folders[state.folders.length - 1].id + 1,
      };
    default:
      return state;
  }
}

export default foldersReducer;

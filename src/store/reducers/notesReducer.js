import { FETCH_NOTES_SUCCESS } from "../actions/types";

const initialState = [];

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default notesReducer;
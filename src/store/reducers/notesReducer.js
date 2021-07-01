const initialState = [
  {
    id: 1,
    title: 'Note 1',
    description: 'Note 1 Description',
  }
];

function notesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default notesReducer;
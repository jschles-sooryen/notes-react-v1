import { createSlice } from '@reduxjs/toolkit';

const initialState = 'column';

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout(state, action) {
      state = action.payload;
      /*
        Must return state when state is a primitive value.
        https://stackoverflow.com/questions/62966863/a-case-reducer-on-a-non-draftable-value-must-not-return-undefined
      */
      return state;
    },
  },
});

export const { setLayout } = layoutSlice.actions;

export default layoutSlice.reducer;

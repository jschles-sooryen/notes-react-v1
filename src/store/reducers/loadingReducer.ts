import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loadingSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    loading(state) {
      state = !state;
      /*
        Must return state when state is a primitive value.
        https://stackoverflow.com/questions/62966863/a-case-reducer-on-a-non-draftable-value-must-not-return-undefined
      */
      return state;
    },
  },
});

export const { loading } = loadingSlice.actions;

export default loadingSlice.reducer;

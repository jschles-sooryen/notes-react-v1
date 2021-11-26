import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: Cookies.get('access_token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInInit: {
      reducer: () => { },
      prepare: (params?: Blob) => ({ payload: params || {} }),
    },
    signInSuccess(state, action) {
      // state.user = action.payload;
      state.user = {
        email: action.payload.email,
        _id: action.payload._id,
      };
    },
  },
});

export const { signInInit, signInSuccess } = authSlice.actions;

export default authSlice.reducer;

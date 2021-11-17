import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;

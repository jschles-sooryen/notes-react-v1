/* eslint-disable import/prefer-default-export */
import { RootState } from '../types';

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;

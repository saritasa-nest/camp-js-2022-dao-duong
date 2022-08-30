import { HttpError } from '@js-camp/core/models/httpError';
import { createSlice } from '@reduxjs/toolkit';

import { login, logout, register } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = undefined;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthorized = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as HttpError;
        state.isAuthorized = false;
        state.isLoading = false;
      })
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthorized = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as HttpError;
        state.isAuthorized = false;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.isAuthorized = false;
        state.isLoading = false;
      }),
});

export const { clearError } = authSlice.actions;

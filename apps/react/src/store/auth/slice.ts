import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { login, register } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(login.pending, state => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
    })
    .addCase(login.rejected, (state, action) => {
      const error = action.payload;
      if (error instanceof AxiosError) {
        state.error = HttpErrorMapper.fromDto(error.response?.data);
      }
      state.isLoading = false;
    })
    .addCase(register.pending, state => {
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
    })
    .addCase(register.rejected, (state, action) => {
      if (action.error.message) {
        // state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

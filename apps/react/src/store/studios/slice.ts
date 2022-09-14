import { createSlice } from '@reduxjs/toolkit';

import { addStudio, fetchStudios } from './dispatchers';
import { initialState, State, studiosAdapter } from './state';

export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchStudios.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchStudios.fulfilled, (state, action) => {
      studiosAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchStudios.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(addStudio.pending, state => {
      state.isLoading = true;
    })
    .addCase(addStudio.fulfilled, (state, action) => {
      studiosAdapter.addOne(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(addStudio.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

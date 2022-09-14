import { createSlice } from '@reduxjs/toolkit';

import { addGenre, fetchGenres } from './dispatchers';
import { genresAdapter, initialState, State } from './state';

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchGenres.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchGenres.fulfilled, (state, action) => {
      genresAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchGenres.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(addGenre.pending, state => {
      state.isLoading = true;
    })
    .addCase(addGenre.fulfilled, (state, action) => {
      genresAdapter.addOne(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(addGenre.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

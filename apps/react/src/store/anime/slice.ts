import { createSlice } from '@reduxjs/toolkit';

import { fetchAnime, fetchNextAnime } from './dispatchers';
import { initialState, animeAdapter, State } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnime.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnime.fulfilled, (state, action) => {
      animeAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchAnime.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchNextAnime.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchNextAnime.fulfilled, (state, action) => {
      animeAdapter.addMany(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchNextAnime.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList, fetchNextAnimeList } from './dispatchers';
import { initialState, animeAdapter, State } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeList.fulfilled, (state, action) => {
      animeAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchNextAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchNextAnimeList.fulfilled, (state, action) => {
      animeAdapter.addMany(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchNextAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

import { createSlice } from '@reduxjs/toolkit';

import { deleteAnime, fetchAnimePage, fetchNextAnimePage } from './dispatchers';
import { initialState, animeAdapter, State } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clearAnimeList(state) {
      animeAdapter.removeAll(state as State);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchAnimePage.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimePage.fulfilled, (state, action) => {
      animeAdapter.setAll(state as State, action.payload.results);
      state.isLoading = false;
    })
    .addCase(fetchAnimePage.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchNextAnimePage.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchNextAnimePage.fulfilled, (state, action) => {
      if (action.payload !== null) {
        animeAdapter.addMany(state as State, action.payload.results);
      }
      state.isLoading = false;
    })
    .addCase(fetchNextAnimePage.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(deleteAnime.pending, state => {
      state.isDeleting = true;
    })
    .addCase(deleteAnime.fulfilled, (state, action) => {
      animeAdapter.removeOne(state as State, action.payload);
      state.isDeleting = false;
    })
    .addCase(deleteAnime.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isDeleting = false;
    }),
});

export const { clearAnimeList } = animeSlice.actions;

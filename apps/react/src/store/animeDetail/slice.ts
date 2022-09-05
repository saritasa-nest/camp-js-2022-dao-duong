import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeDetail } from './dispatchers';
import { initialState, animeDetailAdapter, State } from './state';

export const animeDetailSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeDetail.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
      animeDetailAdapter.addOne(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchAnimeDetail.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

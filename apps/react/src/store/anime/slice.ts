import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimePage, fetchNextAnimePage } from './dispatchers';
import { initialState, animeAdapter, State } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
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
    }),
});

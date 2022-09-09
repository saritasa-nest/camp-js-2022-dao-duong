import { createSlice } from '@reduxjs/toolkit';

import { saveAnimeImage } from './dispatchers';
import { initialState } from './state';

export const animeImageSlice = createSlice({
  name: 'animeImage',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(saveAnimeImage.pending, state => {
      state.isUploading = true;
    })
    .addCase(saveAnimeImage.fulfilled, (state, action) => {
      state.imageUrl = action.payload;
      state.isUploading = false;
    })
    .addCase(saveAnimeImage.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isUploading = false;
    }),
});

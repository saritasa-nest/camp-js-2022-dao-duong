import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Select anime image url. */
export const selectImageUrl = createSelector(
  (state: RootState) => state.image.imageUrl,
  imageUrl => imageUrl,
);

/** Selects image uploading state. */
export const selectIsImageUploading = createSelector(
  (state: RootState) => state.image.isUploading,
  isUploading => isUploading,
);

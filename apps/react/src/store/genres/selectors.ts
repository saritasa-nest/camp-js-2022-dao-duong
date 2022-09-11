import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { genresAdapter } from './state';

export const { selectAll: selectGenres } =
  genresAdapter.getSelectors<RootState>(state => state.genres);

/** Selects genres loading state. */
export const selectAreGenresLoading = createSelector(
  (state: RootState) => state.genres.isLoading,
  isLoading => isLoading,
);

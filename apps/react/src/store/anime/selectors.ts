import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

export const { selectAll: selectAnimeList } = animeAdapter.getSelectors<RootState>(
  state => state.anime,
);

/** Selects anime loading state. */
export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

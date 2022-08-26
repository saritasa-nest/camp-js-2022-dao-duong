import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

const animeSelector = animeAdapter.getSelectors<RootState>(
  state => state.anime,
);

/** Selects all anime from store. */
export const selectAnimeList = createSelector(
  (state: RootState) => animeSelector.selectAll(state),
  animeList => animeList,
);

/** Selects anime loading state. */
export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

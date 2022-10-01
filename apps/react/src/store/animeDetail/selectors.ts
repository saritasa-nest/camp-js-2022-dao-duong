import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeDetailAdapter } from './state';

const { selectById } = animeDetailAdapter.getSelectors();

export const selectAnimeDetail = createSelector(
  (state: RootState, id: EntityId) => selectById(state.animeDetail, id),
  animeDetail => animeDetail,
);

/** Selects anime loading state. */
export const selectIsAnimeDetailLoading = createSelector(
  (state: RootState) => state.animeDetail.isLoading,
  isLoading => isLoading,
);

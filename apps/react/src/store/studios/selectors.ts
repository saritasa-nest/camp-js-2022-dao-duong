import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { studiosAdapter } from './state';

/** Selects all studios from store. */
export const { selectAll: selectStudios } =
  studiosAdapter.getSelectors<RootState>(state => state.studios);

/** Selects studios loading state. */
export const selectAreStudiosLoading = createSelector(
  (state: RootState) => state.studios.isLoading,
  isLoading => isLoading,
);

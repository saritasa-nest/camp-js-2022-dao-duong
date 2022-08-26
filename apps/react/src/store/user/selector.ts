import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects user from store. */
export const selectUser = createSelector(
  (state: RootState) => state.user.user,
  user => user,
);

/** Selects user loading state. */
export const selectIsUserLoading = createSelector(
  (state: RootState) => state.user.isLoading,
  isLoading => isLoading,
);

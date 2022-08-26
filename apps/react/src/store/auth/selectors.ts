import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects auth loading state. */
export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

export const selectAuthError = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);

export const selectAuthToken = createSelector(
  (state: RootState) => state.auth.token,
  token => token,
);

export const selectIsAuthUser = createSelector(
  (state: RootState) => state.auth.token,
  token => token !== null,
);

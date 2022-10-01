import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects auth loading state. */
export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Select auth error value. */
export const selectAuthError = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);

/** Select if user is authorized or not. */
export const selectIsAuthorized = createSelector(
  (state: RootState) => state.auth.isAuthorized,
  isAuthorized => isAuthorized,
);

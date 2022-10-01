import { Token } from '@js-camp/core/models/auth/token';
import { HttpError } from '@js-camp/core/models/httpError';

/** Auth state. */
export interface AuthState {

  /** Token values. */
  readonly token: Token | null;

  /** Error. */
  readonly error?: HttpError;

  /** Whether the auth states are loading or not. */
  readonly isLoading: boolean;

  /** Whether the auth states are loading or not. */
  readonly isAuthorized: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  token: null,
  isAuthorized: false,
};

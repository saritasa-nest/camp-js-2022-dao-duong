import { Token } from '@js-camp/core/models/auth/token';
import { HttpError } from '@js-camp/core/models/httpError';

/** Genres state. */
export interface AuthState {

  /** Genres list. */
  readonly token: Token | null;

  /** Error. */
  readonly error?: HttpError;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  token: null,
};
import { User } from '@js-camp/core/models/user/user';

/** Genres state. */
export interface UserState {

  /** User data. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Whether the user are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: UserState = {
  isLoading: false,
  user: null,
};

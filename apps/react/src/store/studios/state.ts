import { Studio } from '@js-camp/core/models/anime';

/** Studios state. */
export interface StudiosState {

  /** Error. */
  readonly error?: string;

  /** Whether the studio are loading or not. */
  readonly isLoading: boolean;

  /** Studios list. */
  readonly studios: Studio[];
}

export const initialState: StudiosState = {
  isLoading: false,
  studios: [],
};

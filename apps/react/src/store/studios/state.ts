import { Studio } from '@js-camp/core/models/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const studiosAdapter = createEntityAdapter<Studio>();

/** Studios state. */
export interface StudiosState {

  /** Error. */
  readonly error?: string;

  /** Whether the studio are loading or not. */
  readonly isLoading: boolean;

  /** Studios list. */
  readonly studios: Studio[];
}

export const initialState = studiosAdapter.getInitialState<StudiosState>({
  isLoading: false,
  studios: [],
});

export type State = typeof initialState;

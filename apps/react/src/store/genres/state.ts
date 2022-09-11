import { Genre } from '@js-camp/core/models/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const genresAdapter = createEntityAdapter<Genre>();

/** Genres state. */
export interface GenresState {

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;

  /** Genres list. */
  readonly genres: Genre[];
}

export const initialState = genresAdapter.getInitialState<GenresState>({
  isLoading: false,
  genres: [],
});

export type State = typeof initialState;
